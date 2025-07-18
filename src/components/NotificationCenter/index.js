import React from "react";
import { Typography, Row, Col, Card, Space, List, Button, Tag, Statistic } from "antd";
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
import IconSelector from "../IconSelector";

const { Text } = Typography;

const studentList = ["Ameer", "Jon Snow", "Tony", "Bruce Banner"];

const activityList = [
    {
        user:'Jon show',
        activity: "Submitted a Question",
        time: 'Just now',
        icon: "BugOutlined"
    },
    {
        user:'Aria Stark',
        activity: "You have a new Query from Aria",
        time: 'Just now',
        icon: "UserOutlined"
    },
    {
        user:'Sansa',
        activity: "Submitted a Question",
        time: '59 mins ago',
        icon: "BugOutlined"
    },
    {
        user:'Sansa',
        activity: "Sansa Subscribed to you",
        time: '59 mins ago',
        icon: "ApartmentOutlined"
    },

]

export default function NotificationCenter() {
    return (
            <Row  gutter={[16,16]} >
                <Col span={24}>
                    Notification List
                    <List 
                        dataSource={activityList}
                        renderItem={item => (
                            <List.Item style={{borderBottomWidth: 0, padding: "6px 0"}}>
                                <Space >
                                    <IconSelector type={item.icon} style={{padding:'8px', backgroundColor: "#EDEEFC", borderRadius: '10px'}}/>
                                    <div>
                                        <Text ellipsis={{
                                            suffix: ''
                                        }} 
                                        style={{ fontSize: '14px', display: "block"}}
                                        >{item.activity}</Text> 
                                        <Text style={{ fontSize: '12px', color: "rgba('0,0,0,0.4')"}}>{item.time}</Text> 
                                    </div>
                                </Space>
                            </List.Item>
                        )}

                    />
                </Col>
                <Col span={24}>
                Activity List
                <List 
                    dataSource={activityList}
                    renderItem={item => (
                        <List.Item style={{borderBottomWidth: 0, padding: "6px 0"}}>
                            <Space align="center">
                                <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} >{item.user.charAt()}</Avatar>
                                {/* <Space direction="vertical" style={{
                                    rowGap: 0,
                                
                                }}>
                                    <Text ellipsis={{
                                        suffix: '..'
                                    }} 
                                    style={{ fontSize: '14px'}}
                                    >{item.activity}</Text> 
                                    <Text style={{ fontSize: '12px', color: "#c00c"}}>{item.time}</Text> 
                                </Space> */}
                                <div>
                                    <Text ellipsis={{
                                        suffix: ''
                                    }} 
                                    style={{ fontSize: '14px', display: "block"}}
                                    >{item.activity}</Text> 
                                    <Text style={{ fontSize: '12px', color: "rgba('0,0,0,0.4')"}}>{item.time}</Text> 
                                </div>
                                
                            </Space>
                        </List.Item>
                    )}
                />
            </Col>
            <Col span={24}>
                Students
                <List 
                    dataSource={studentList}
                    renderItem={item => (
                        <List.Item style={{borderBottomWidth: 0}}>
                            <Space>
                                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                <Text>{item}</Text> 
                            </Space>
                        </List.Item>
                    )}
                />
            </Col>
            </Row>
    )
}