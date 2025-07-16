import React from "react";
import { Card, Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

export default function ParentDasboard({ user }) {
    return (
        <div style={{ padding: '24px' }}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card>
                        <Title level={2}>Welcome to Parent Dashboard</Title>
                        <Text>Hello, {user?.email || 'Parent'}!</Text>
                        <br />
                        <Text type="secondary">Monitor your child's progress and view test results.</Text>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}