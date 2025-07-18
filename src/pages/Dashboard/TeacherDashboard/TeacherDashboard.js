import React from "react";
import { Typography, Row, Col, Card, Progress, List, Space, Table, Tooltip, Button, Tag } from "antd";
import { ProTable, StatisticCard } from "@ant-design/pro-components";
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts';
import LineChart from "../../../components/LineCart";
import Sider from "antd/es/layout/Sider";

const { Title, Text  } = Typography;
const { Statistic } = StatisticCard;

const defaultProps={
    user: {
        name: 'Kamal',
    },
    stats:[]
}


const statusMap = {
    0: {
      color: 'blue',
      text: 'Draft',
    },
    1: {
      color: 'green',
      text: 'Published',
    },
    2: {
      color: 'red',
      text: 'Archived',
    },
  };


const testTableCol=
    [
        {
            title: 'Test',
            width: 120,
            dataIndex: 'test',
            valueType: 'select',
            
          },
          {
            title: 'Date',
            width: 120,
            dataIndex: 'date',
            valueType: 'select',
            
          },
          {
            title: 'Assigned',
            width: 120,
            dataIndex: 'test',
            valueType: 'select',
            
          },
          {
            title: 'Status',
            width: 120,
            dataIndex: 'test',
            render: (_, record) => (
                            <Tag color={record.status.color}>{record.status.text}</Tag>
                          ),
            
          },
    ]

const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 56,
    bottom: 0,
    maxWidth: "280px",
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    left: "calc(100% - 280px)",
    background: "#fff",
  };

const data = [
    { name: '0 - 40', value: 10 },
    { name: '40 -60', value: 20 },
    { name: '60 -80', value: 45 },
    { name: '80 - 100', value: 35 },
  ];
  const COLORS = ['#1C1C1C', '#BAEDBD', '#95A4FC', '#B1E3FF'];

const testChartData = [
    {
      "year": "1850",
      "value": 0,
      "category": "Liquid fuel"
    },
    {
      "year": "1850",
      "value": 54,
      "category": "Solid fuel"
    },
    {
      "year": "1850",
      "value": 0,
      "category": "Gas fuel"
    },
    {
      "year": "1850",
      "value": 0,
      "category": "Cement production"
    },
    {
      "year": "1850",
      "value": 0,
      "category": "Gas flarinl"
    },
    {
      "year": "1851",
      "value": 0,
      "category": "Liquid fuel"
    },
    {
      "year": "1851",
      "value": 54,
      "category": "Solid fuel"
    },
    {
      "year": "1851",
      "value": 0,
      "category": "Gas fuel"
    },
    {
      "year": "1851",
      "value": 0,
      "category": "Cement production"
    },
    {
      "year": "1851",
      "value": 0,
      "category": "Gas flarinl"
    },
    {
      "year": "1852",
      "value": 0,
      "category": "Liquid fuel"
    },
    {
      "year": "1852",
      "value": 57,
      "category": "Solid fuel"
    },
]

const topScorerData = [
    {
        name: "Ameer",
        score: 92,
    },
    {
        name: "Meraj",
        score: 80,
    },
    {
        name: "Roopesh",
        score: 95,
    },
    {
        name: "Akhilesh",
        score: 70,
    },
    {
        name: "Ritesh",
        score: 86,
    },
    {
        name: "jon snow",
        score: 92,
    },
    {
        name: "Ameer",
        score: 80,
    },
    {
        name: "Ameer",
        score: 90,
    },
    {
        name: "Ameer",
        score: 85,
    },
    {
        name: "Ameer",
        score: 60,
    },
]

const testTableDate = [
    {
        test: "Physics",
        date: "june 24,2025",
        assigned: 12,
        status: 1,

    },
    {
        test: "Physics",
        date: "june 24,2025",
        assigned: 12,
        status: 2,

    }
]


const renderLegend = (props) => {
    const { payload } = props;
    // console.log("payload", payload)
    return (
    //   <ul>
    //     {
    //       payload.map((entry, index) => {
    //         console.log("entry", entry)
    //             return (
    //             <li key={`item-${index}`} style={{ listStyle: "none", display: "flex", alignContent: "center", justifyContent: "space-between", marginBottomm: "10px"}}>
    //                 <span>
    //                     <span style={{ display: "inline-block", width:"10px", height:"10px", borderRadius: "100%", marginRight:"10px", background: `${entry.color}`}}></span>
    //                     {entry.payload.name}
    //                 </span>
    //                 <span>{entry.payload.value}</span>
    //             </li>)
    //       }
            
    //       )
    //     }
    //   </ul>

        <List 
        dataSource={props.payload}
        renderItem={entry => (
        <List.Item style={{borderBottomWidth: 0}}>
            <span>
                        <span style={{ display: "inline-block", width:"10px", height:"10px", borderRadius: "100%", marginRight:"10px", background: `${entry.color}`}}></span>
                        {entry.payload.name}
                    </span>
                    <span>{entry.payload.value}</span>
        </List.Item>
        )}
        >

        </List>
    );
  }

function TeacherDasboard(props = defaultProps) {
    return (
        <>
        <Row gutter={[16,16]}>
            <Col span={24}>
                <Title>Welcome Kamal</Title>
            </Col>
            {/* Stats card section start */}
            <Col span={6}>
                <Card 
                    styles={{
                            body: {
                                padding: '24px',
                                backgroundColor: '#EDEEFC'
                            },
                            borderRadius: '20px',
                        }}
                        style={{
                            borderRadius: '20px',
                        }}
                    >  
                        <Statistic 
                            title={ <Text style={{ fontSize:'16px', fontWeight: '600'}}>Questions</Text>}
                            layout= "vertical"
                            value={72 || ""}
                            valueStyle= {{fontSize: '48px',fontWeight:"600", color: "#000"}}
                        />
                </Card>
            </Col>
            <Col span={6}>
                <Card 
                    styles={{
                            body: {
                                padding: '24px',
                                backgroundColor: '#EDEEFC'
                            },
                            borderRadius: '20px',
                        }}
                        style={{
                            borderRadius: '20px',
                        }}
                    >  
                        <Statistic 
                            title={ <Text style={{ fontSize:'16px', fontWeight: '600'}}>Questions</Text>}
                            layout= "vertical"
                            value={72 || ""}
                            valueStyle= {{fontSize: '48px',fontWeight:"600", color: "#000"}}
                        />
                </Card>
            </Col>
            <Col span={6}>
                <Card 
                    styles={{
                            body: {
                                padding: '24px',
                                backgroundColor: '#EDEEFC'
                            },
                            borderRadius: '20px',
                        }}
                        style={{
                            borderRadius: '20px',
                        }}
                    >  
                        <Statistic 
                            title={ <Text style={{ fontSize:'16px', fontWeight: '600'}}>Questions</Text>}
                            layout= "vertical"
                            value={72 || ""}
                            valueStyle= {{fontSize: '48px',fontWeight:"600", color: "#000"}}
                        />
                </Card>
            </Col>
            <Col span={6}>
                <Card 
                    styles={{
                            body: {
                                padding: '24px',
                                backgroundColor: '#EDEEFC'
                            },
                            borderRadius: '20px',
                        }}
                        style={{
                            borderRadius: '20px',
                        }}
                    >  
                        <Statistic 
                            title={ <Text style={{ fontSize:'16px', fontWeight: '600'}}>Questions</Text>}
                            layout= "vertical"
                            value={72 || ""}
                            valueStyle= {{fontSize: '48px',fontWeight:"600", color: "#000"}}
                        />
                </Card>
            </Col>
            {/* Stats card section End */}
            {/* Test Performance Chart section start */}
            <Col span={18}>
            <Card
                    styles={{
                        body: {
                            padding: '24px',
                        },
                        header:{
                            borderBottom: 'none',
                        }
                    }}
                    title="Test Performance"
                    style={{
                        borderRadius: '20px',
                        backgroundColor: '#F7F9FB',
                    }}
                >
                    <LineChart/>
                </Card>
            </Col>
             {/* Test Performance Chart section End */}
             {/* Top Rankers List section start */}
            <Col span={6}>
                <Card
                    styles={{
                        body: {
                            padding: '24px',
                        },
                        header:{
                            borderBottom: 'none',
                        }
                    }}
                    title="Top Rankers"
                    style={{
                        borderRadius: '20px',
                        backgroundColor: '#F7F9FB',
                    }}
                >
                    <List 
                        dataSource={topScorerData}
                        renderItem={item => (
                          <List.Item style={{borderBottomWidth: 0}}>
                            {/* <Space justi> */}
                                <span style={{marginRight: "10px", minWidth: '100px'}}>{item.name}</span>
                                <Progress strokeColor="black" percent={item.score} showInfo={false}/>
                            {/* </Space> */}
                        </List.Item>
                        )}
                    >
                        
                    </List>
                </Card>
                
            </Col>
             {/* Top Rankers List section End */}
            {/* Test Table section start */}
            <Col span={18}>
                    <Row justify={"space-between"}>
                                    <Title level={4}>Tests</Title>
                                    <Button
                                        style={{
                                            padding:'20px',
                                        }}
                                    >...</Button>
                                </Row>
                <ProTable
                    headerTitle="Tests"
                    size="small"
                    toolbar={<Button
                        style={{
                            padding:'20px',
                        }}
                    >...</Button>}
                    rowClassName={() => "rowClassName1"}
                    dataSource={testTableDate}
                    style={{
                        borderCollapse: "separate", 
                        borderSpacing: '0 1em',
                        background: '#f7f9fb',
                    }}
                    styles={{
                        borderCollapse: "separate", 
                        borderSpacing: '0 1em',
                        background: '#f7f9fb',
                    }}
                    onRow={(record, index) => ({
                        style: {
                            background: "#EDEEFC",
                            borderRadius: "20px",
                            margin: "10px",
                            ">td:firstChild": {
                                borderTopLeftRadius: "10px",
                                borderBottomLeftRadius: "10px",
                              }
                        }
                      })}
                    column={testTableCol}
                    options={false}
                    search={false}
                />               
            </Col>
             {/* Test Table section End */}
             {/* Overall Scores donut chart section start */}
            <Col span={6}>
                <Card
                    styles={{
                        body: {
                            padding: '24px',
                        },
                        header:{
                            borderBottom: 'none',
                        }
                    }}
                    title="Overall Scores"
                    style={{
                        height: "100%",
                        backgroundColor: '#F7F9FB',
                    }}
                >
                    <div style={{
                        height:'400px'
                    }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={200} height={200}>
                            <Pie
                                data={data}
                                y="0"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={2}
                                dataKey="value"
                                cornerRadius={15}
                            >
                                {data.map((entry, index) => (
                                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            {/* <Legend 
                                layout="vertical"
                            /> */}
                            <Legend content={renderLegend} />
                        </PieChart>
                        
                    </ResponsiveContainer>
                    
                    </div>
                    

                </Card>
                
            </Col>
             {/* Overall Score donut chart section  End */}

        </Row>
        {/* <Sider className=["ant"] style={siderStyle}>
            left sidebar

        </Sider> */}
        </>
    )
}

export default TeacherDasboard;