import { Outlet, useNavigate } from "react-router-dom";
import ProLayout from "@ant-design/pro-layout";
import { Dropdown, Avatar, message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import getDefaultProps from "./_defaultProps";
import { getUser, clearAuth } from "../utils/auth";

export default function Layout() {
    const navigate = useNavigate();
    const user = getUser() || {
        email: "guest@example.com",
        role: "teacher"
    };

    const userRoles = user?.role || [];

    // Filter routes based on user roles
    const filterRoutes = (routes) => {
        console.log("routes", routes);
        return routes.filter(route => {
            if (route.access === "canAdmin" && !userRoles.includes("admin")) {
                return false;
            }
            if (route.access === "canUser" && !userRoles.includes("teacher")) {
                return false;
            }

            return true;
        });
    };

    const handleLogout = () => {
        clearAuth();
        message.success('Logged out successfully');
        navigate('/');
    };

    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: user.email,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: handleLogout,
        },
    ];

    const defaultProps = getDefaultProps(userRoles);
    const filteredRoutes = filterRoutes(defaultProps.route.routes);
    console.log("filteredRoutes", filteredRoutes);

    return (
        <ProLayout
            title=""
            logo='/brand-iknomyslf-logo.png'
            siderWidth={207} 
            {...defaultProps}
            route={{
                ...defaultProps.route,
                routes: filteredRoutes,
            }}
            layout="mix"
            fixedHeader
            headerRender={true}
            menuItemRender={(item, dom) => (
                <a href={item.path}>{dom}</a>
            )}
            avatarProps={{
                src: null,
                size: 'default',
                title: user.email,
                render: (props, dom) => {
                    return (
                        <Dropdown
                            menu={{
                                items: userMenuItems,
                                onClick: ({ key }) => {
                                    if (key === 'logout') {
                                        handleLogout();
                                    }
                                }
                            }}
                            trigger={['click']}
                        >
                            <div style={{ cursor: 'pointer' }}>
                                <Avatar icon={<UserOutlined />} />
                            </div>
                        </Dropdown>
                    );
                },
            }}
        >
            <Outlet/>
        </ProLayout>
    );
}