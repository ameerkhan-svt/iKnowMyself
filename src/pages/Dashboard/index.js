import React from "react";
import TeacherDasboard from "./TeacherDashboard/TeacherDashboard";
import ParentDasboard from "./ParentDashboard/ParentDashboard";
import {ProLayout,PageContainer} from "@ant-design/pro-layout";
import getDefaultProps from "../../layouts/_defaultProps";

const user = {
    name: "Mohammad Meraj",
    role: "Teacher"
}



function Dashboard() {
    console.log("user.role", user.role)
    return ( <>
    {user.role === 'Teacher' ? <TeacherDasboard/> : <ParentDasboard/>}
    </>)
}

export default Dashboard;
