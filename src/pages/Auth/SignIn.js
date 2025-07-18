import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert, Image, Row, Col, notification, Card, Space, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, setUser, setToken } from '../../utils/auth';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function SignIn ( props ) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);
        
        try {
            const { userID, password } = values;

            const data = await authAPI.login({
                email: userID,
                password
            });

            // Store user data and token
            setUser(data.user);
            if (data.token) {
                setToken(data.token);
            }
            
            notification.success({
                message: 'Sign In Successful',
                description: `Welcome back, ${data.user.email}!`,
                duration: 3,
            });
            
            // Redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Sign in error:', error);
            setError(error.message);
            notification.error({
                message: 'Sign In Failed',
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
      };
      

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <Card 
                style={{ 
                    width: '100%',
                    maxWidth: '420px',
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    border: 'none',
                    overflow: 'hidden'
                }}
                bodyStyle={{ padding: '40px' }}
            >
                <Row gutter={[0, 24]} justify="center">
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Image 
                            width={120} 
                            preview={false} 
                            src='/brand-iknomyslf-logo.png'
                            style={{ marginBottom: '16px' }}
                        />
                        <Title level={2} style={{ 
                            margin: '0 0 8px 0', 
                            color: '#1a1a1a',
                            fontWeight: 600 
                        }}>
                            Welcome Back
                        </Title>
                        <Text style={{ 
                            color: '#666', 
                            fontSize: '16px',
                            display: 'block',
                            marginBottom: '32px'
                        }}>
                            Sign in to continue your learning journey
                        </Text>
                    </Col>
                    
                    <Col span={24}>
                        {error && (
                            <Alert 
                                message={error} 
                                type="error" 
                                showIcon 
                                style={{ 
                                    marginBottom: '24px',
                                    borderRadius: '8px',
                                    border: 'none'
                                }} 
                            />
                        )}
                        
                        <Form 
                            size='large' 
                            name="sign_in" 
                            layout="vertical" 
                            onFinish={onFinish}
                            style={{ width: '100%' }}
                        >
                            <Form.Item
                                label={<span style={{ fontWeight: 500, color: '#333' }}>Email Address</span>}
                                name="userID"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' },
                                ]}
                            >
                                <Input 
                                    prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
                                    placeholder="Enter your email address" 
                                    style={{ 
                                        borderRadius: '8px',
                                        border: '1px solid #e1e5e9',
                                        padding: '12px'
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span style={{ fontWeight: 500, color: '#333' }}>Password</span>}
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                                    placeholder="Enter your password" 
                                    style={{ 
                                        borderRadius: '8px',
                                        border: '1px solid #e1e5e9',
                                        padding: '12px'
                                    }}
                                />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: '24px' }}>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={loading} 
                                    block
                                    style={{
                                        height: '48px',
                                        borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Form.Item>

                            <Divider style={{ margin: '24px 0', color: '#bfbfbf' }}>
                                <Text style={{ color: '#999', fontSize: '14px' }}>New to iKnowMyself?</Text>
                            </Divider>

                            <div style={{ textAlign: 'center' }}>
                                <Text style={{ color: '#666', fontSize: '15px' }}>
                                    Don't have an account? 
                                </Text>
                                <Link 
                                    to="/signup" 
                                    style={{ 
                                        marginLeft: '8px',
                                        color: '#667eea',
                                        fontWeight: 500,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Create Account
                                </Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default SignIn;