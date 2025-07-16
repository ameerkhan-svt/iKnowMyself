import React from "react";
import TeacherDasboard from "./TeacherDashboard/TeacherDashboard";
import ParentDasboard from "./ParentDashboard/ParentDashboard";
import {ProLayout,PageContainer} from "@ant-design/pro-layout";
import getDefaultProps from "../../layouts/_defaultProps";
import { getUser } from "../../utils/auth";

function Dashboard() {
    const user = getUser() || {
        email: "guest@example.com",
        role: "teacher"
    };

    console.log("user.role", user.role);
    
    return ( <>
        {user.role === 'teacher' ? <TeacherDasboard user={user} /> : <ParentDasboard user={user} />}
    </>);
}

export default Dashboard;
