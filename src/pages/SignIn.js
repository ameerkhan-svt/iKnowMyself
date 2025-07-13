import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert, Image, Row, Col, notification, Card } from 'antd';

const { Title } = Typography;

function SignIn ( props ) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const router = useRouter();

    const onFinish = async (values) => {
        setLoading(true);
        // const { userID, password } = values;
    
        // const result = await signIn('credentials', {
        //   redirect: false,
        //   userID,
        //   password,
        // });
        // console.log("result------------------------", result)
        // setLoading(false);
    
        // if (result.error) {
        //   if(result.error === 'CredentialsSignin') {
        //     notification.error({
        //       message: 'Invalid Credentials',
        //       description: 'Please check your User ID and Password and try again.',
        //     });
        //     setError('Invalid User ID or Password');
        //   }
          
        // } else {
        //   router.push('/dashboard'); // Redirect to the dashboard or a secure page on successful login
        // }
      };
      

    return (
        <Card style={{ maxWidth: '360px', padding : 12,  display : 'flex', flexFlow : 'column wrap', justifyContent : 'center', margin: 'auto auto' }}>
            <Row gutter={[10, 20]}>
                <Col xs={24} align="center">
                    <Image width={140} preview={false} src='/brand-iknomyslf-logo.png'></Image>
                </Col>
                <Col xs={24} align="center">
                    <Title level={3}>Log In</Title>
                </Col>
                <Col xs={24}>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '1rem' }} />}
          <Form size='large' name="sign_in" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="User ID"
              name="userID"
              rules={[
                { required: true, message: 'Please input your User ID!' },
                { type: 'text', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="Enter customer id" />
            </Form.Item>
    
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
    
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Sign In
              </Button>
            </Form.Item>
          </Form>
                </Col>
            </Row>
          
          
        
        </Card>
      );
}

export default SignIn;