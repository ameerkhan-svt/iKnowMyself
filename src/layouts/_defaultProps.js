import {
    BankOutlined,
    BookOutlined,
    BuildOutlined,
    DownloadOutlined,
    FileTextOutlined,
    FundOutlined,
    StarOutlined,
    BellFilled,
    IdcardFilled,
    UsergroupAddOutlined,
    DocumentOutlined,
    
    HomeFilled,
    UserOutlined
  } from "@ant-design/icons";

  export default function getDefaultProps(userRoles){
    return {
        route: {
            path: "/",
            routes: [
                {
                    path: "/dashboard",
                    name: "Home",
                    icon: <HomeFilled />,
                    access: "canUser", // Only accessible by user users
                },
                {
                    path: "/questions",
                    name: "Questions",
                    icon: <UserOutlined />,
                    access: "canUser", // Only accessible by user users
                  },
                  {
                    path: "/test-center",
                    name: "Test Center",
                    icon: <IdcardFilled />,
                    access: "canUser", // Only accessible by user users
                  },
                  {
                    path: "/students",
                    name: "Students",
                    icon: <UsergroupAddOutlined />,
                    access: "canUser", // Only accessible by user users
                  },
                  {
                    path: "/setting",
                    name: "Setting",
                    icon: <BellFilled />,
                    access: "canUser", // Only accessible by user users
                  },
            ]
        },
        location: {
            pathname: "/",
          },
    }
  }