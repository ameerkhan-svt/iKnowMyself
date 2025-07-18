import React from "react";
import Icon, { QuestionOutlined, RightOutlined, UserOutlined, BugOutlined, WalletFilled, StepBackwardOutlined, ApartmentOutlined, DollarCircleOutlined, CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons';


const IconSelector = ({ type, ...rest }) => {
    const getIcon = (iconType) => ({
        WalletFilled: <WalletFilled {...rest} />,
        StepBackwardOutlined: <StepBackwardOutlined {...rest} />,
        DollarCircleOutlined: <DollarCircleOutlined {...rest} />,
        UserOutlined: <UserOutlined {...rest} />,
        BugOutlined: <BugOutlined {...rest}/>,
        ApartmentOutlined: <ApartmentOutlined {...rest}/>
    }[iconType]);

    return getIcon(type) || <QuestionOutlined {...rest} />;
};

export default IconSelector;