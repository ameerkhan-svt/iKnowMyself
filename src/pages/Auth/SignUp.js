import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert, Image, Row, Col, notification, Card, Select } from 'antd';
import { APIS } from "../../config/apiEndPoints";

const { Title } = Typography;

function SignUp ( props ) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const router = useRouter();

    const onFinish = async (values) => {
      setLoading(true);
      const { email, password } = values;
      console.log("email", email)
      console.log("password", password);
      const response = await fetch(APIS.login, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data", data);
      // const result = await signIn('credentials', {
      //   redirect: false,
      //   email,
      //   password,
      // });
      // setLoading(false);
  
      // if (result.error) {
      //   setError(result.error);
      // } else {
      //   router.push('/dashboard/investors'); // Redirect to the dashboard or a secure page on successful login
      // }
    };
      

    return (
        <Card variant="borderless">
            <Row gutter={[10, 20]}>
                <Col xs={24} align="center">
                    <Image width={140} preview={false} src='/brand-iknomyslf-logo.png'></Image>
                </Col>
                <Col xs={24} align="center">
                    <Title level={3}>Sign Up</Title>
                </Col>
                <Col xs={24}>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '1rem' }} />}
          <Form size='large' name="sign_in" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your Email' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
    
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: 'Please select a role' }]}
            >
              <Select 
                placeholder="Role"
              >              
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="teacher">Teacher</Select.Option>
                    <Select.Option value="parent">Parent</Select.Option>
                    <Select.Option value="student">Student</Select.Option>
                    
                </Select>
            </Form.Item>
    
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Create Account
              </Button>
            </Form.Item>
          </Form>
                </Col>
            </Row>
          
          
        
        </Card>
      );
}

export default SignUp;