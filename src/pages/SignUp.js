import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert, Image, Row, Col, notification, Card, Select, Space, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/auth';
import { UserOutlined, LockOutlined, MailOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);
        
        try {
            const { email, password, confirmPassword, role } = values;
            
            // Check if passwords match
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                setLoading(false);
                return;
            }

            const data = await authAPI.signup({
                email,
                password,
                role
            });

            notification.success({
                message: 'Registration Successful',
                description: 'Your account has been created successfully. Please sign in.',
                duration: 4.5,
            });
            
            // Redirect to sign in page
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message);
            notification.error({
                message: 'Registration Failed',
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
                    maxWidth: '480px',
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
                            Create Account
                        </Title>
                        <Text style={{ 
                            color: '#666', 
                            fontSize: '16px',
                            display: 'block',
                            marginBottom: '32px'
                        }}>
                            Join iKnowMyself and start your learning adventure
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
                            name="sign_up" 
                            layout="vertical" 
                            onFinish={onFinish}
                            autoComplete="off"
                            style={{ width: '100%' }}
                        >
                            <Form.Item
                                label={<span style={{ fontWeight: 500, color: '#333' }}>Email Address</span>}
                                name="email"
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
                                label={<span style={{ fontWeight: 500, color: '#333' }}>Role</span>}
                                name="role"
                                rules={[
                                    { required: true, message: 'Please select your role!' }
                                ]}
                            >
                                <Select 
                                    placeholder="Select your role"
                                    style={{ 
                                        borderRadius: '8px',
                                    }}
                                    dropdownStyle={{ borderRadius: '8px' }}
                                >
                                    <Option value="teacher">
                                        <Space>
                                            <TeamOutlined />
                                            <span>Teacher</span>
                                        </Space>
                                    </Option>
                                    <Option value="parent">
                                        <Space>
                                            <UserOutlined />
                                            <span>Parent</span>
                                        </Space>
                                    </Option>
                                </Select>
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label={<span style={{ fontWeight: 500, color: '#333' }}>Password</span>}
                                        name="password"
                                        rules={[
                                            { required: true, message: 'Please input your password!' },
                                            { min: 4, message: 'Password must be at least 4 characters long!' }
                                        ]}
                                    >
                                        <Input.Password 
                                            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                                            placeholder="Password" 
                                            style={{ 
                                                borderRadius: '8px',
                                                border: '1px solid #e1e5e9',
                                                padding: '12px'
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<span style={{ fontWeight: 500, color: '#333' }}>Confirm</span>}
                                        name="confirmPassword"
                                        rules={[
                                            { required: true, message: 'Please confirm your password!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Passwords do not match!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password 
                                            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                                            placeholder="Confirm" 
                                            style={{ 
                                                borderRadius: '8px',
                                                border: '1px solid #e1e5e9',
                                                padding: '12px'
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

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
                                    Create Account
                                </Button>
                            </Form.Item>

                            <Divider style={{ margin: '24px 0', color: '#bfbfbf' }}>
                                <Text style={{ color: '#999', fontSize: '14px' }}>Already have an account?</Text>
                            </Divider>

                            <div style={{ textAlign: 'center' }}>
                                <Text style={{ color: '#666', fontSize: '15px' }}>
                                    Ready to sign in? 
                                </Text>
                                <Link 
                                    to="/" 
                                    style={{ 
                                        marginLeft: '8px',
                                        color: '#667eea',
                                        fontWeight: 500,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Sign In Here
                                </Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default SignUp;
