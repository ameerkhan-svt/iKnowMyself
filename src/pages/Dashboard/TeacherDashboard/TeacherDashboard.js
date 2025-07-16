import React from "react";
import { Card, Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

function TeacherDasboard({ user }) {
    return (
        <div style={{ padding: '24px' }}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card>
                        <Title level={2}>Welcome to Teacher Dashboard</Title>
                        <Text>Hello, {user?.email || 'Teacher'}!</Text>
                        <br />
                        <Text type="secondary">Manage your questions, tests, and students from here.</Text>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default TeacherDasboard;