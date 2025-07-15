import React from "react";
import { Card, Statistic, Typography } from "antd";

const { Text } = Typography;

export default function DashboardStatisticCard(props){
    return (
        <Card
            styles={{
                    body: {
                        padding: '24px',
                        borderRadius: '20px',
                    },
                }}
            style={{
                backgroundColor: '#EDEEFC',
            }}
            >  
                <Statistic
                    style={{
                        background: "none",
                    }}
                    title={ <Text style={{ fontSize:'16px', fontWeight: '600'}}>{props.title}</Text>}
                    layout= "vertical"
                    value={props.value || ""}
                    valueStyle= {{fontSize: '48px',fontWeight:"600", color: "#000", display: "flex", justifyContent: "space-between", alignItems: "center"}}
                    // suffix with Trend to be added
                />
        </Card>
    )
}