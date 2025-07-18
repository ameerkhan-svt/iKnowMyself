import React from "react";
// import "./index.css";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Flex } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
  position: "fixed",
    
    width: "100%",
    zIndex: 100,
    // inset-inline-end: 0,
};

const layoutStyle = {
  // borderRadius: 8,
  overflow: 'hidden',
  // width: 'calc(50% - 8px)',
  // maxWidth: 'calc(50% - 8px)',
};

// const siderStyle = {
//   overflow: "auto",
//   height: "100vh",
//   position: "sticky",
//   insetInlineStart: 0,
//   top: 0,
//   bottom: 0,
//   scrollbarWidth: "thin",
//   scrollbarGutter: "stable",
// };

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
  insetBlockStart: "56px",
  height: "calc(100% - 56px)",
  position: "fixed",

  flex: "0 0 207px",
    maxWidth: "207px",
    minWidth: "207px",
    width: "207px",
  // height: "100vh",
  // overflow: "auto",
  // top: 0,
  // bottom: 0,
};

const contentStyle ={
  display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "transparent",
    position: "relative",
    paddingBlock: "32px",
    paddingInline: "40px",
}

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const DashboardLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    // <Layout hasSider style={layoutStyle}>
    //     <Header style={headerStyle}>Header</Header>
    //     <Layout>
    //   <Sider style={siderStyle}>
    //     <div className="demo-logo-vertical" />
    //     <Menu
    //       theme="dark"
    //       mode="inline"
    //       defaultSelectedKeys={["4"]}
    //       items={items}
    //     />
    //   </Sider>
    //   <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
    //       <Outlet/>
    //     </Content>
    //     <Sider style={siderStyle}>
    //       <div className="demo-logo-vertical" />
    //       <Menu
    //         theme="dark"
    //         mode="inline"
    //         defaultSelectedKeys={["4"]}
    //         items={items}
    //       />
    //     </Sider>
        
        
    //   </Layout>
    // </Layout>



    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
            <Header style={headerStyle}>Header</Header>
              <Layout>
                <Sider  style={siderStyle}>
                <div className="demo-logo-vertical" />
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={["4"]}
                  items={items}
                />
                </Sider>
                <Content style={contentStyle}>
                <Outlet/>
                
              </Content>
              <Sider  style={siderStyle}>
                    Notification here
                </Sider>
              </Layout>
            </Layout>
    </Flex>
    
  );
};

export default DashboardLayout;
