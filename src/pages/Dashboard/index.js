import React from "react";
import TeacherDasboard from "./TeacherDashboard/TeacherDashboard";
import ParentDasboard from "./ParentDashboard/ParentDashboard";
import {ProLayout,PageContainer} from "@ant-design/pro-layout";
import getDefaultProps from "../../layouts/_defaultProps";
import { Typography, Row, Col, Card, Progress, List, Button, Tag, Statistic } from "antd";
import NotificationCenter from "../../components/NotificationCenter"

const user = {
    name: "Mohammad Meraj",
    role: "Teacher"
}



function Dashboard() {
    console.log("user.role", user.role);
    return ( <>
        <Row gutter={[16,16]}>
        <Col span={20}>
            {user.role === 'Teacher' ? <TeacherDasboard/> : <ParentDasboard/>}
        </Col>
        <Col span={4}>
            <Card style={{ height: '100%', width: '100%', background: "none", boxShadow: "none", overflow: "auto",}} variant="borderless">
                <NotificationCenter/>
            </Card>
        </Col>

    </Row>
    
    </>)
}

export default Dashboard;
