import React from "react";
// import { Row, Col ,Typography, Form } from "antd";
import { Card, Row, Col, Typography, Input, Spin, Select, Button, message, Descriptions, List, Space, Tooltip, Form} from 'antd'; 
import TextEditor from "../../../components/TextEditor/TextEditor";

const { Title } = Typography;

const onFinish = value => {
    console.log("onFinish value", value);
}

const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "code"],
      ["clean"],
    ],
  };
   
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "code",
  ];
   

const CustomLabel = ({title}) => {
    return <span style={{ color: "#5570F1", fontSize:"12px"}}>{title}</span>
} 

function Question (props) {
    const [form] = Form.useForm();

    return (
    <>
      
        <Row>
           <Col span={24}>
               <Title>Upload Question</Title>
           </Col>
           <Col span={24}>
               <Form
                 layout="vertical"
                 onFinish={onFinish}
                 style={{ maxWidth: 600 }}
               >
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            label={<CustomLabel title="Question Title"/>}
                            name="questionTitle"
                            rules={[{ required: true, message: 'Please input Question Title' }]}
                            >
                            <Input placeholder="Question Title"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<CustomLabel title="Subject"/>}>
                            <Select>
                                <Select.Option value="Physics">Physics</Select.Option>
                                <Select.Option value="Maths">Maths</Select.Option>
                                <Select.Option value="Chemistry">Chemistry</Select.Option>
                            </Select>
                        </Form.Item>
                
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<CustomLabel title="Class"/>}>
                            <Select>
                                <Select.Option value="9">9th</Select.Option>
                                <Select.Option value="10">10th</Select.Option>
                                <Select.Option value="11">11th</Select.Option>
                                <Select.Option value="12">12th</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                    <Form.Item 
                        wrapperCol={{ offset: 6, span: 16 }}
                        name="editorContent" 
                        label="Rich Text Editor" 
                        rules={[{ required: true, message: 'Please input content!' }]}
                    >
                        <TextEditor/>
                    </Form.Item>
                    </Col>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Row>
                
                
               </Form>
           </Col>
       </Row>
        </>
    )
};

export default Question ;
