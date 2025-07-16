import React, { useState, useEffect } from "react";
// import { Row, Col ,Typography, Form } from "antd";
import { Card, Row, Col, Typography, Input, Spin, Select, Button, message, Checkbox, List, Space, Tooltip, Form} from 'antd'; 
import { useParams, useNavigate } from 'react-router-dom';
import TextEditor from "../../../components/TextEditor/TextEditor";
import { useCourses } from "../../../hooks/useCourses";
import { useClasses } from "../../../hooks/useClasses";
import { useQuestion } from "../../../hooks/useQuestion";
import { questionService } from "../../../services/questionService";
import { getUser } from "../../../utils/auth";

const { Title } = Typography;


const CustomLabel = ({title}) => {
    return (
        <span style={{ 
            color: "#1f2937", 
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            letterSpacing: "0.025em",
            textTransform: "none"
        }}>
            {title}
        </span>
    );
} 

function Question (props) {
    const { id: questionId } = useParams(); // Get question ID from URL
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isMultipleChoice, setIsMultipleChoice] = useState(false);
    const [saving, setSaving] = useState(false);
    
    // Determine if we're in edit mode
    const isEditMode = !!questionId;
    
    // Use custom hooks for data fetching
    const { courses, loading: loadingCourses, error: coursesError, refetch: refetchCourses } = useCourses();
    const { classes, loading: loadingClasses, error: classesError, refetch: refetchClasses } = useClasses();
    const { question, loading: loadingQuestion, error: questionError } = useQuestion(questionId);

    // Pre-populate form when question data is loaded
    useEffect(() => {
        if (question && isEditMode) {
            console.log('Loading question data for edit:', question);
            
            // Set form values
            const formValues = {
                title: question.title,
                subject: question.subject,
                classLevel: question.class, // Note: API returns 'class' but form expects 'classLevel'
                difficultyLevel: question.difficulty,
                content: question.content,
                isMultipleChoice: question.isMultipleChoice
            };

            console.log('Form values being set:', formValues);

            // If it's a multiple choice question, populate the options and correct answer
            if (question.isMultipleChoice && question.options) {
                formValues.optionA = question.options[0] || '';
                formValues.optionB = question.options[1] || '';
                formValues.optionC = question.options[2] || '';
                formValues.optionD = question.options[3] || '';
                
                // Convert correct answer index to letter (0=A, 1=B, 2=C, 3=D)
                if (question.correctAnswers && question.correctAnswers.length > 0) {
                    const answerIndex = question.correctAnswers[0];
                    const answerLetter = ['A', 'B', 'C', 'D'][answerIndex];
                    formValues.correctAnswer = answerLetter;
                }
            }

            form.setFieldsValue(formValues);
            setIsMultipleChoice(question.isMultipleChoice);
        }
    }, [question, isEditMode, form]);

    const onFinish = async (values) => {
        console.log("form values", values);
        
        // Validate multiple choice questions
        if (values.isMultipleChoice) {
            const { optionA, optionB, optionC, optionD, correctAnswer } = values;
            
            if (!optionA || !optionB || !optionC || !optionD) {
                message.error('Please fill in all answer options for multiple choice questions');
                return;
            }
            
            if (!correctAnswer) {
                message.error('Please select the correct answer');
                return;
            }
        }

        // This function will be called by both Save and Save as Draft buttons
        // The status will be determined by which button was clicked
    };

    const handleSave = async (status = 'PUBLISHED') => {
        try {
            const values = await form.validateFields();
            setSaving(true);

            const user = getUser();
            if (!user) {
                message.error('User not found. Please log in again.');
                return;
            }

            // Find the course ID from the selected subject name
            const selectedCourse = courses.find(course => course.name === values.subject);
            if (!selectedCourse) {
                message.error('Selected subject not found');
                return;
            }

            // Prepare question data according to API specification
            const questionData = {
                title: values.title,
                subject: values.subject, // subject name
                class: values.classLevel, // API expects 'class' field, form provides 'classLevel'
                difficulty: values.difficultyLevel,
                content: values.content, // question description
                isMultipleChoice: values.isMultipleChoice || false,
                course: selectedCourse.id, // subject ID
                status: status, // PUBLISHED or DRAFT
                teacher: user.id // user ID
            };

            // Add multiple choice specific fields if applicable
            if (values.isMultipleChoice) {
                questionData.options = [
                    values.optionA,
                    values.optionB,
                    values.optionC,
                    values.optionD
                ];
                
                // Convert correctAnswer letter to index (A=0, B=1, C=2, D=3)
                const answerIndex = values.correctAnswer === 'A' ? 0 :
                                  values.correctAnswer === 'B' ? 1 :
                                  values.correctAnswer === 'C' ? 2 : 3;
                questionData.correctAnswers = [answerIndex];
            }

            console.log("Submitting question data:", questionData);

            let result;
            let actionText;

            if (isEditMode) {
                // Update existing question
                result = await questionService.updateQuestion(questionId, questionData);
                actionText = status === 'DRAFT' ? 'updated and saved as draft' : 'updated and published';
            } else {
                // Create new question
                result = await questionService.createQuestion(questionData);
                actionText = status === 'DRAFT' ? 'saved as draft' : 'published';
            }
            
            message.success(`Question ${actionText} successfully!`);
            
            if (!isEditMode) {
                // Reset form after successful creation
                form.resetFields();
                setIsMultipleChoice(false);
            }
            
            console.log(`${isEditMode ? 'Updated' : 'Created'} question:`, result);

            // Navigate back to questions list after successful save
            navigate('/questions');

        } catch (error) {
            console.error('Error saving question:', error);
            message.error(`Failed to save question: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleMultipleChoiceChange = (e) => {
        setIsMultipleChoice(e.target.checked);
        if (!e.target.checked) {
            // Clear multiple choice answers when unchecked
            form.setFieldsValue({
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: '',
                correctAnswer: undefined
            });
        }
    };

    return (
    <div style={{ 
        backgroundColor: 'white', 
        minHeight: '100vh', 
        padding: '24px' 
    }}>
        {/* Show loading spinner when fetching question data in edit mode */}
        {isEditMode && loadingQuestion && (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" tip="Loading question..." />
            </div>
        )}

        {/* Show error message if question fetch failed */}
        {isEditMode && questionError && (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Typography.Text type="danger">{questionError}</Typography.Text>
                <br />
                <Button onClick={() => navigate('/questions')} style={{ marginTop: '16px' }}>
                    Back to Questions
                </Button>
            </div>
        )}

        {/* Main form - only show when not loading or in create mode */}
        {(!isEditMode || (question && !loadingQuestion && !questionError)) && (
            <>
                <Row>
                   <Col span={24}>
                       <Title>{isEditMode ? 'Edit Question' : 'Upload Question'}</Title>
                   </Col>
           <Col span={24}>
               <Form
                 form={form}
                 layout="vertical"
                 style={{ maxWidth: 800 }}
                 initialValues={{ 
                     isMultipleChoice: false,
                     optionA: '',
                     optionB: '',
                     optionC: '',
                     optionD: '',
                     correctAnswer: undefined
                 }}
               >
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            label={<CustomLabel title="Question Title"/>}
                            name="title"
                            rules={[{ required: true, message: 'Please input Question Title' }]}
                            >
                            <Input placeholder="Question Title"/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item 
                            name="content" 
                            label={<CustomLabel title="Question Description"/>}
                            rules={[{ required: true, message: 'Please input question description!' }]}
                            getValueFromEvent={(content) => content}
                            trigger="onChange"
                        >
                            <TextEditor placeholder="Enter your question description here..." />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item  
                            name="subject" 
                            label={<CustomLabel title="Subject"/>}
                            rules={[{ required: true, message: 'Please select a subject' }]}
                            >
                            <Select 
                                placeholder="Select a subject"
                                loading={loadingCourses}
                                notFoundContent={
                                    loadingCourses ? (
                                        <Spin size="small" />
                                    ) : coursesError ? (
                                        <div style={{ textAlign: 'center', padding: '8px' }}>
                                            <div>Failed to load courses</div>
                                            <Button size="small" type="link" onClick={refetchCourses}>
                                                Retry
                                            </Button>
                                        </div>
                                    ) : (
                                        'No courses found'
                                    )
                                }
                                showSearch
                                filterOption={(input, option) =>
                                    option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {courses.map(course => (
                                    <Select.Option key={course.id} value={course.name}>
                                        {course.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                
                    </Col>
                    <Col span={12}>
                        <Form.Item  
                            name="classLevel" 
                            label={<CustomLabel title="Class"/>}
                            rules={[{ required: true, message: 'Please select a class' }]}
                            >
                            <Select 
                                placeholder="Select a class"
                                loading={loadingClasses}
                                notFoundContent={
                                    loadingClasses ? (
                                        <Spin size="small" />
                                    ) : classesError ? (
                                        <div style={{ textAlign: 'center', padding: '8px' }}>
                                            <div>Failed to load classes</div>
                                            <Button size="small" type="link" onClick={refetchClasses}>
                                                Retry
                                            </Button>
                                        </div>
                                    ) : (
                                        'No classes found'
                                    )
                                }
                                showSearch
                                filterOption={(input, option) =>
                                    option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {classes.map(classItem => (
                                    <Select.Option key={classItem.id} value={classItem.grade}>
                                        {classItem.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item  
                            name="difficultyLevel" 
                            label={<CustomLabel title="Difficulty Level"/>}
                            rules={[{ required: true, message: 'Please select difficulty level' }]}
                            >
                            <Select placeholder="Select difficulty level">
                                <Select.Option value="easy">Easy</Select.Option>
                                <Select.Option value="medium">Medium</Select.Option>
                                <Select.Option value="hard">Hard</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item 
                        name="isMultipleChoice"
                        label={<CustomLabel title="Multiple choice"/>}
                        valuePropName="checked"
                        >
                            <Checkbox onChange={handleMultipleChoiceChange}>
                                This is a multiple choice question
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    
                    {/* Multiple Choice Options - Only show when isMultipleChoice is true */}
                    {isMultipleChoice && (
                        <>
                            <Col span={24}>
                                <Typography.Text strong style={{ color: "#5570F1", fontSize: "14px" }}>
                                    Answer Options
                                </Typography.Text>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<CustomLabel title="Option A"/>}
                                    name="optionA"
                                    rules={[{ required: true, message: 'Please input Option A' }]}
                                >
                                    <Input placeholder="Enter Option A" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<CustomLabel title="Option B"/>}
                                    name="optionB"
                                    rules={[{ required: true, message: 'Please input Option B' }]}
                                >
                                    <Input placeholder="Enter Option B" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<CustomLabel title="Option C"/>}
                                    name="optionC"
                                    rules={[{ required: true, message: 'Please input Option C' }]}
                                >
                                    <Input placeholder="Enter Option C" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<CustomLabel title="Option D"/>}
                                    name="optionD"
                                    rules={[{ required: true, message: 'Please input Option D' }]}
                                >
                                    <Input placeholder="Enter Option D" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label={<CustomLabel title="Correct Answer"/>}
                                    name="correctAnswer"
                                    rules={[{ required: true, message: 'Please select the correct answer' }]}
                                >
                                    <Select placeholder="Select the correct answer">
                                        <Select.Option value="A">Option A</Select.Option>
                                        <Select.Option value="B">Option B</Select.Option>
                                        <Select.Option value="C">Option C</Select.Option>
                                        <Select.Option value="D">Option D</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </>
                    )}
                    <Col span={24}>
                        <Form.Item style={{ textAlign: 'right', marginTop: '24px' }}>
                            {isEditMode ? (
                                // Edit mode - only show Update button
                                <Button 
                                    type="primary" 
                                    size="large"
                                    loading={saving}
                                    onClick={() => handleSave('PUBLISHED')}
                                    style={{ minWidth: '120px' }}
                                >
                                    Update Question
                                </Button>
                            ) : (
                                // Create mode - show both Save as Draft and Publish buttons
                                <Space size="middle">
                                    <Button 
                                        type="default" 
                                        size="large"
                                        loading={saving}
                                        onClick={() => handleSave('DRAFT')}
                                        style={{ minWidth: '120px' }}
                                    >
                                        Save as Draft
                                    </Button>
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        loading={saving}
                                        onClick={() => handleSave('PUBLISHED')}
                                        style={{ minWidth: '120px' }}
                                    >
                                        Publish Question
                                    </Button>
                                </Space>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
               </Form>
           </Col>
       </Row>
            </>
        )}
        </div>
    )
};

export default Question ;
