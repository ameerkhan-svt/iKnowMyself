import React, { useState } from "react";
// import ProTable from "@ant-design/pro-table";
import { ProTable } from "@ant-design/pro-components";
import { Tag, Space, Input, Select, Button, Tooltip } from "antd";
import { PlusOutlined, CodepenOutlined, DeleteOutlined, EditOutlined, CalendarOutlined} from "@ant-design/icons";
import debounce from "lodash/debounce";

const { Option } = Select;


const subjectMap = {
    0: "Physics",
    1: "Maths",
    2: "English",
    3: "Chemistry",
    4: "Biology",
}

const statusMap = {
    0: {
      color: 'blue',
      text: 'Draft',
    },
    1: {
      color: 'green',
      text: 'Published',
    },
    2: {
      color: 'red',
      text: 'Archived',
    },
  };

const tableListDataSource = [];

for (let i = 0; i < 50; i += 1) {
    tableListDataSource.push({
      key: i,
      questionId: '#CM-98' + i, 
      name: 'Question-' + i,
      subject: subjectMap[((Math.floor(Math.random() * 10) % 5) + '')],
      status: statusMap[((Math.floor(Math.random() * 10) % 3) + '') ],
      createdOn: Date.now() - Math.floor(Math.random() * 100000),
    });
  }

export default function Questions( props ){
    const [filterBy, setFilterBy] = useState("search");
    const [filterSearchValue, setFilterSearchValue] = useState("");

    const columnDef = [
        {
            title: "Question ID",
            dataIndex: "questionId",
        },
        {
            title: "Subject",
            dataIndex: "subject",
        },
        {
            title: "Question",
            dataIndex: "name",
        },
        {
            title: "Created On",
            dataIndex: "createdOn",
            render: (text) => <Space> <CalendarOutlined /> <span>{new Date(text).toLocaleString()}</span></Space>
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (_, record) => (
                <Tag color={record.status.color}>{record.status.text}</Tag>
              ),
        },
        {
            title: "ACTIONS",
            align:'right',
            search: false,
            render: (_, record) => [
              <Space key="actions">
              
              <Tooltip key="view" title="View">
              <Button
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("delete question")
                }}
                
              >
                
              </Button>
              </Tooltip>
              
              <Tooltip key="edit" title="Edit">
                <Button  icon={<EditOutlined />} href={`/questions/${record.questionId}`} >
                  
                </Button>  
              </Tooltip>
              </Space>
            ],
          },
    ]

    const handleFilterSearch = (value) => {
        console.log('handleFilterSearch value', value);
        setFilterSearchValue(value);
      };

    const handleFilterBy = (value) => {
        console.log('handleFilterBy value', value);
        setFilterBy(value);
      };

    const debouncedHandleFilterSearch = debounce((value) => {
    handleFilterSearch(value);
    }, 1000); // Adjust debounce delay as needed


    
    return (
        <ProTable
            columns={columnDef}
            headerTitle="Questions"
            bordered
            search={false}
            pagination={{ 
                pageSize: 10,
            }}
            rowKey="key"
            rowSelection={{}}
            request={(params, sorter, filter) => {
                console.log(params, sorter, filter);
                return Promise.resolve({
                  data: tableListDataSource,
                  success: true,
                });
              }}
              options={false}
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
                <Button key="add" type="primary" icon={<CodepenOutlined />}>
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