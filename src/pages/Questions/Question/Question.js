import React from "react";
// import { Row, Col ,Typography, Form } from "antd";
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Typography, Input, Spin, Select, Button, message, Checkbox, List, Space, Tooltip, Form, Flex} from 'antd'; 
import TextEditor from "../../../components/TextEditor/TextEditor";

const { Title } = Typography;


const CustomLabel = ({title, style}) => {
    return <span style={{ color: "#5570F1", fontSize:"12px", ...style}}>{title}</span>
} 

function Question (props) {
    const [form] = Form.useForm();
    const { questionId } = useParams();

    console.log("questionId", questionId);

    const onFinish = async (values) => {
        console.log("form values", values);
    }

    return (
    <>
      
        <Row>
           <Col span={24}>
               <Title>{`${questionId ? "Edit" : "Upload "} Question`}</Title>
           </Col>
           <Col span={24}>
               <Form
                 layout="vertical"
                 onFinish={onFinish}
                 style={{ maxWidth: 600 }}
                 initialValues={{ isMultipleChoice: false }}
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
                    <Col span={12}>
                        <Form.Item  
                            name="subject" 
                            label={<CustomLabel title="Subject"/>}
                            rules={[{ required: true, message: 'Please input Subject' }]}
                            >
                            <Select>
                                <Select.Option value="Physics">Physics</Select.Option>
                                <Select.Option value="Maths">Maths</Select.Option>
                                <Select.Option value="Chemistry">Chemistry</Select.Option>
                            </Select>
                        </Form.Item>
                
                    </Col>
                    <Col span={12}>
                        <Form.Item  
                            name="classLevel" 
                            label={<CustomLabel title="Class"/>}
                            rules={[{ required: true, message: 'Please input class' }]}
                            >
                            <Select style={{ background: 'transparent'}}>
                                <Select.Option value="9">9th</Select.Option>
                                <Select.Option value="10">10th</Select.Option>
                                <Select.Option value="11">11th</Select.Option>
                                <Select.Option value="12">12th</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                    
                        <Form.Item 
                        name="isMultipleChoice"
                        >
                         
                           {/* <Flex justify="flex-end" align="center"> */}
                           <CustomLabel title="Multiple choice" style={{marginRight: "10px"}}/>
                            <Checkbox title="Multiple choice question?" style={{marginleft: "10px"}}/>
                        
                            {/* </Flex> */}
                            
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                    <Form.Item 
                        name="content"
                        rules={[{ required: true, message: 'Please input content!' }]}
                    >
                        <TextEditor/>
                    </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                                <Flex justify="flex-end" align="center">
                                <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                
                                </Flex>
                            
                        </Form.Item>
                    </Col>
                   
                </Row>
               </Form>
           </Col>
       </Row>
        </>
    )
};

export default Question ;
