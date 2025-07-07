import { Outlet } from "react-router-dom";
import ProLayout from "@ant-design/pro-layout";
import getDefaultProps from "./_defaultProps";


export default function AuthLayout() {
    return (
        <ProLayout
            title=""
            logo='/brand-iknomyslf-logo.png'
            route={{
                route: {
                    path: "/",
                    routes: [],
                  },
                  location: {
                    pathname: "/",
                  },
            }}
            layout="mix"
            navTheme="dark"
            theme="dark"
            fixedHeader
            headerRender={true}
            menuItemRender={false}
            avatarProps={false}
            //actionsRender={() => <SettingDrawer />}
            menuFooterRender={false}
        >
            <Outlet/>
        </ProLayout>
    )
}