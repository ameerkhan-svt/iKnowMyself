import React from 'react';
import { Button, Typography, Space, Card, Image } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function NotFound() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/dashboard');
    };

    const handleGoBack = () => {
        navigate(-1);
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
                    maxWidth: '600px',
                    borderRadius: '20px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                    border: 'none',
                    overflow: 'hidden',
                    textAlign: 'center'
                }}
                bodyStyle={{ padding: '60px 40px' }}
            >
                {/* 404 Number with Animation */}
                <div style={{
                    fontSize: '120px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1',
                    marginBottom: '20px',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    404
                </div>

                {/* Emoji Animation */}
                <div style={{
                    fontSize: '60px',
                    marginBottom: '30px',
                    animation: 'float 3s ease-in-out infinite'
                }}>
                    🤔
                </div>

                {/* Main Title */}
                <Title level={2} style={{ 
                    margin: '0 0 16px 0', 
                    color: '#1a1a1a',
                    fontWeight: 600,
                    fontSize: '32px'
                }}>
                    Oops! Page Not Found
                </Title>

                {/* Description */}
                <Text style={{ 
                    color: '#666', 
                    fontSize: '18px',
                    display: 'block',
                    marginBottom: '40px',
                    lineHeight: '1.6'
                }}>
                    It seems like you've wandered off the learning path! 📚<br/>
                    The page you're looking for doesn't exist or has been moved.
                </Text>

                {/* Helpful suggestions */}
                <div style={{
                    background: '#f8f9fa',
                    padding: '24px',
                    borderRadius: '12px',
                    marginBottom: '40px',
                    border: '1px solid #e1e5e9'
                }}>
                    <Text style={{ 
                        color: '#555', 
                        fontSize: '15px',
                        display: 'block',
                        marginBottom: '12px',
                        fontWeight: 500
                    }}>
                        Here's what you can do:
                    </Text>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '8px', color: '#666' }}>
                            🏠 Go back to the dashboard
                        </div>
                        <div style={{ marginBottom: '8px', color: '#666' }}>
                            ↩️ Return to the previous page
                        </div>
                        <div style={{ marginBottom: '8px', color: '#666' }}>
                            🔍 Check the URL for any typos
                        </div>
                        <div style={{ color: '#666' }}>
                            📖 Browse our questions library
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <Space size="large" direction="vertical" style={{ width: '100%' }}>
                    <Space size="middle" wrap>
                        <Button 
                            type="primary" 
                            size="large"
                            icon={<HomeOutlined />}
                            onClick={handleGoHome}
                            style={{
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: 500,
                                height: '48px',
                                padding: '0 24px',
                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                            }}
                        >
                            Go to Dashboard
                        </Button>
                        
                        <Button 
                            type="default" 
                            size="large"
                            icon={<ArrowLeftOutlined />}
                            onClick={handleGoBack}
                            style={{
                                borderRadius: '10px',
                                border: '1px solid #d9d9d9',
                                fontSize: '16px',
                                fontWeight: 500,
                                height: '48px',
                                padding: '0 24px',
                                backgroundColor: '#fafafa'
                            }}
                        >
                            Go Back
                        </Button>
                    </Space>

                    <Button 
                        type="link" 
                        size="large"
                        icon={<SearchOutlined />}
                        onClick={() => navigate('/questions')}
                        style={{
                            color: '#667eea',
                            fontSize: '16px',
                            fontWeight: 500,
                            padding: '0',
                            height: 'auto'
                        }}
                    >
                        Browse Questions
                    </Button>
                </Space>

                {/* Fun Quote */}
                <div style={{
                    marginTop: '40px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)',
                    borderRadius: '12px',
                    border: '1px solid #667eea20'
                }}>
                    <Text style={{ 
                        color: '#667eea', 
                        fontSize: '14px',
                        fontStyle: 'italic',
                        display: 'block'
                    }}>
                        "Getting lost is just another way of saying 'going exploring'."
                    </Text>
                    <Text style={{ 
                        color: '#999', 
                        fontSize: '12px',
                        marginTop: '8px',
                        display: 'block'
                    }}>
                        — Justina Chen
                    </Text>
                </div>
            </Card>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
            `}</style>
        </div>
    );
}

export default NotFound;
