import { Outlet } from "react-router-dom";
import ProLayout from "@ant-design/pro-layout";
import getDefaultProps from "./_defaultProps";


const user = {
    name: "Mohammad Meraj",
    role: "Teacher"
}

const userRoles = user?.role || [];

  // Filter routes based on user roles
  const filterRoutes = (routes) => {
    console.log("routes",routes);
    return routes.filter(route => {
      if (route.access === "canAdmin" && !userRoles.includes("admin")) {
        return false;
      }
      if (route.access === "canUser" && !userRoles.includes("Teacher")) {
        return false;
      }
  
      return true;
    });
  };


const defaultProps = getDefaultProps(userRoles);
const filteredRoutes = filterRoutes(defaultProps.route.routes);
console.log("filteredRoutes",filteredRoutes);

export default function Layout() {
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
        >
            <Outlet/>
        </ProLayout>

    )
}