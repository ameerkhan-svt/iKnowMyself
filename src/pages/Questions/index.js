import React, { useState, useEffect } from "react";
// import ProTable from "@ant-design/pro-table";
import { ProTable } from "@ant-design/pro-components";
import { Tag, Space, Input, Select, Button, Tooltip, message, Modal } from "antd";
import { PlusOutlined, CodepenOutlined, DeleteOutlined, EditOutlined, CalendarOutlined, EyeOutlined} from "@ant-design/icons";
import debounce from "lodash/debounce";
import { useQuestions } from "../../hooks/useQuestions";

const { Option } = Select;
const { confirm } = Modal;

const statusMap = {
    'DRAFT': {
      color: 'blue',
      text: 'Draft',
    },
    'PUBLISHED': {
      color: 'green',
      text: 'Published',
    },
    'ARCHIVED': {
      color: 'red',
      text: 'Archived',
    },
  };

export default function Questions( props ){
    const [filterBy, setFilterBy] = useState("search");
    const [filterSearchValue, setFilterSearchValue] = useState("");
    const { questions, loading, error, deleteQuestion, refetch } = useQuestions();

    // Show error message when error changes
    useEffect(() => {
        if (error) {
            message.error(`Error loading questions: ${error}`);
        }
    }, [error]);

    // Handle delete action
    const handleDelete = (record) => {
        confirm({
            title: 'Are you sure you want to delete this question?',
            content: `Question: ${record.title}`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    console.log('Deleting question with ID:', record.id);
                    const success = await deleteQuestion(record.id);
                    if (success) {
                        message.success('Question deleted successfully');
                        console.log('Question deleted successfully');
                    } else {
                        message.error('Failed to delete question');
                        console.error('Delete operation returned false');
                    }
                } catch (error) {
                    console.error('Error deleting question:', error);
                    message.error(`Failed to delete question: ${error.message || error}`);
                }
            },
        });
    };

    const handleFilterSearch = (value) => {
        console.log('handleFilterSearch value', value);
        setFilterSearchValue(value);
        // You can implement search functionality here
        // For now, we'll just update the state
    };

    const handleFilterBy = (value) => {
        console.log('handleFilterBy value', value);
        setFilterBy(value);
    };

    const debouncedHandleFilterSearch = debounce((value) => {
        handleFilterSearch(value);
    }, 1000); // Adjust debounce delay as needed

    const columnDef = [
        {
            title: "Question ID",
            dataIndex: "id",
            render: (text) => `#CM-${text}`,
        },
        {
            title: "Subject",
            dataIndex: "subject",
            filters: [
                { text: 'Mathematics', value: 'Mathematics' },
                { text: 'Physics', value: 'Physics' },
                { text: 'Chemistry', value: 'Chemistry' },
                { text: 'Biology', value: 'Biology' },
                { text: 'English', value: 'English' },
                { text: 'Geography', value: 'Geography' },
                { text: 'History', value: 'History' },
                { text: 'Literature', value: 'Literature' },
                { text: 'Computer Science', value: 'Computer Science' },
                { text: 'Science', value: 'Science' },
            ],
            onFilter: (value, record) => record.subject === value,
        },
        {
            title: "Question",
            dataIndex: "title",
            ellipsis: true,
            width: 300,
        },
        {
            title: "Type",
            dataIndex: "isMultipleChoice",
            render: (isMultipleChoice) => (
                <Tag color={isMultipleChoice ? 'blue' : 'green'}>
                    {isMultipleChoice ? 'Multiple Choice' : 'Text Answer'}
                </Tag>
            ),
            filters: [
                { text: 'Multiple Choice', value: true },
                { text: 'Text Answer', value: false },
            ],
            onFilter: (value, record) => record.isMultipleChoice === value,
        },
        {
            title: "Difficulty",
            dataIndex: "difficulty",
            render: (difficulty) => {
                const colors = {
                    'easy': 'green',
                    'medium': 'orange', 
                    'hard': 'red'
                };
                return (
                    <Tag color={colors[difficulty] || 'default'}>
                        {difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Unknown'}
                    </Tag>
                );
            },
            filters: [
                { text: 'Easy', value: 'easy' },
                { text: 'Medium', value: 'medium' },
                { text: 'Hard', value: 'hard' },
            ],
            onFilter: (value, record) => record.difficulty === value,
        },
        {
            title: "Created On",
            dataIndex: "createdAt",
            render: (text) => <Space> <CalendarOutlined /> <span>{new Date(text).toLocaleString()}</span></Space>,
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => {
                const statusInfo = statusMap[status] || { color: 'default', text: status };
                return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
            },
            filters: [
                { text: 'Draft', value: 'DRAFT' },
                { text: 'Published', value: 'PUBLISHED' },
                { text: 'Archived', value: 'ARCHIVED' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: "ACTIONS",
            align:'right',
            search: false,
            render: (_, record) => [
              <Space key="actions">
              
              <Tooltip key="delete" title="Delete">
              <Button
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(record);
                }}
                
              >
                
              </Button>
              </Tooltip>
              
              <Tooltip key="view" title="View">
                <Button icon={<EyeOutlined />} href={`/question/${record.id}`} >
                  
                </Button>  
              </Tooltip>
              
              <Tooltip key="edit" title="Edit">
                <Button  icon={<EditOutlined />} href={`/question/${record.id}`} >
                  
                </Button>  
              </Tooltip>
              </Space>
            ],
          },
    ]

    // Transform questions data for the table
    const tableData = questions.map(question => ({
        ...question,
        key: question.id,
    }));

    
    return (
        <ProTable
            columns={columnDef}
            headerTitle="Questions"
            bordered
            search={false}
            loading={loading}
            pagination={{ 
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} questions`,
            }}
            rowKey="key"
            rowSelection={{}}
            dataSource={tableData}
            options={true}
            toolBarRender={() => [
                <Space.Compact key="toolbar">
                  <Input onChange={(e)=> debouncedHandleFilterSearch(e.target.value)} key="search" placeholder="Search by question name, subject, class or subject" />
      
                    <Select
                      key="filterBy"
                      defaultValue="search"
                      style={{ width: 200 }}
                      onChange={handleFilterBy}
                    >
                      <Option value="search">Name</Option>
                      <Option value="subject">Subject</Option>
                      <Option value="class">Class</Option>
                      <Option value="status">Status</Option>
                    </Select>
                  </Space.Compact>,
                <Button key="test" type="primary" icon={<CodepenOutlined />}>
                  Create Test
                </Button>,
                <Button key="add" href="/question/new" type="primary" icon={<PlusOutlined />}>
                  Add Question
                </Button>,

              ]}
            
            // pagination={5} // Enable pagination controls
        />
    )
}