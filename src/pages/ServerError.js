import React from 'react';
import { Button, Typography, Space, Card, Progress } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, ReloadOutlined, ToolOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function ServerError() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/dashboard');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
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
                {/* 500 Number with Animation */}
                <div style={{
                    fontSize: '120px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1',
                    marginBottom: '20px',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    500
                </div>

                {/* Animated Tools Icon */}
                <div style={{
                    fontSize: '60px',
                    marginBottom: '30px',
                    animation: 'spin 2s linear infinite'
                }}>
                    ⚙️
                </div>

                {/* Main Title */}
                <Title level={2} style={{ 
                    margin: '0 0 16px 0', 
                    color: '#1a1a1a',
                    fontWeight: 600,
                    fontSize: '32px'
                }}>
                    Oops! Something Went Wrong
                </Title>

                {/* Description */}
                <Text style={{ 
                    color: '#666', 
                    fontSize: '18px',
                    display: 'block',
                    marginBottom: '30px',
                    lineHeight: '1.6'
                }}>
                    Our servers are having a little hiccup! 🔧<br/>
                    Don't worry, our team has been notified and we're working on it.
                </Text>

                {/* Progress Bar Animation */}
                <div style={{
                    marginBottom: '40px',
                    background: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #e1e5e9'
                }}>
                    <Text style={{ 
                        color: '#555', 
                        fontSize: '15px',
                        display: 'block',
                        marginBottom: '16px',
                        fontWeight: 500
                    }}>
                        🔧 Our team is fixing this...
                    </Text>
                    <Progress 
                        percent={75} 
                        status="active" 
                        strokeColor={{
                            '0%': '#ff6b6b',
                            '100%': '#ee5a24',
                        }}
                        trailColor="#f0f0f0"
                        style={{ marginBottom: '12px' }}
                    />
                    <Text style={{ color: '#999', fontSize: '13px' }}>
                        Estimated resolution time: Soon™
                    </Text>
                </div>

                {/* Helpful suggestions */}
                <div style={{
                    background: '#fff5f5',
                    padding: '24px',
                    borderRadius: '12px',
                    marginBottom: '40px',
                    border: '1px solid #ffcccc'
                }}>
                    <Text style={{ 
                        color: '#555', 
                        fontSize: '15px',
                        display: 'block',
                        marginBottom: '12px',
                        fontWeight: 500
                    }}>
                        While we fix this, you can try:
                    </Text>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '8px', color: '#666' }}>
                            🔄 Refresh the page in a few moments
                        </div>
                        <div style={{ marginBottom: '8px', color: '#666' }}>
                            🏠 Go back to the dashboard
                        </div>
                        <div style={{ marginBottom: '8px', color: '#666' }}>
                            ⏰ Try again in a few minutes
                        </div>
                        <div style={{ color: '#666' }}>
                            📧 Contact support if this persists
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <Space size="large" direction="vertical" style={{ width: '100%' }}>
                    <Space size="middle" wrap>
                        <Button 
                            type="primary" 
                            size="large"
                            icon={<ReloadOutlined />}
                            onClick={handleRefresh}
                            style={{
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: 500,
                                height: '48px',
                                padding: '0 24px',
                                boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)'
                            }}
                        >
                            Try Again
                        </Button>
                        
                        <Button 
                            type="default" 
                            size="large"
                            icon={<HomeOutlined />}
                            onClick={handleGoHome}
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
                            Go Home
                        </Button>
                    </Space>

                    <Button 
                        type="link" 
                        size="large"
                        icon={<ArrowLeftOutlined />}
                        onClick={handleGoBack}
                        style={{
                            color: '#ff6b6b',
                            fontSize: '16px',
                            fontWeight: 500,
                            padding: '0',
                            height: 'auto'
                        }}
                    >
                        Go Back
                    </Button>
                </Space>

                {/* Server Status */}
                <div style={{
                    marginTop: '40px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #ff6b6b10 0%, #ee5a2410 100%)',
                    borderRadius: '12px',
                    border: '1px solid #ff6b6b20'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '12px'
                    }}>
                        <ToolOutlined style={{ 
                            color: '#ff6b6b', 
                            fontSize: '18px',
                            marginRight: '8px'
                        }} />
                        <Text style={{ 
                            color: '#ff6b6b', 
                            fontSize: '14px',
                            fontWeight: 500
                        }}>
                            Server Status
                        </Text>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#ffa500',
                            animation: 'pulse 2s infinite'
                        }}></div>
                        <Text style={{ 
                            color: '#666', 
                            fontSize: '13px'
                        }}>
                            Maintenance in progress
                        </Text>
                    </div>
                </div>

                {/* Fun Quote */}
                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    border: '1px solid #e1e5e9'
                }}>
                    <Text style={{ 
                        color: '#ff6b6b', 
                        fontSize: '14px',
                        fontStyle: 'italic',
                        display: 'block'
                    }}>
                        "The best way to debug a program is to understand it."
                    </Text>
                    <Text style={{ 
                        color: '#999', 
                        fontSize: '12px',
                        marginTop: '8px',
                        display: 'block'
                    }}>
                        — Anonymous Developer
                    </Text>
                </div>
            </Card>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.5;
                        transform: scale(1.2);
                    }
                }
            `}</style>
        </div>
    );
}

export default ServerError;
