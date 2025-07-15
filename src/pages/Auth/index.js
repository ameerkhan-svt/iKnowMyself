import React, {  useState} from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Button,Row } from 'antd';
import { Tabs } from 'antd';

// const { items } = Tabs

export default function Auth(props) {
    const [showSignin, setShowSignin] = useState(true);

    const items = [
        {
          key: '1',
          label: 'Sign Up',
          children: <SignUp/>,
        },
        {
            key: '2',
            label: 'Sign In',
            children: <SignIn/>,
        },
      ];
    function callback(key) {
        console.log(key);
      }
    return <>
    {/* <Row>
        { showSignin ? <SignIn/> : <SignUp/> }
        <Button onClick={() => setShowSignin(!showSignin)}>login</Button>
    </Row> */}

    <Tabs onChange={callback} type="card" 
        tabBarStyle={{
            display:"flex",
            justifyContent: "space-between",
        }}
        size="large"
        centered
        style={{ 
            borderRadius: "20px",
            border:"none",
            maxWidth: '400px', backgroundColor: "#fff", padding : 20,  display : 'flex', flexFlow : 'column wrap', justifyContent : 'center', margin: 'auto auto' }}
        items={items} 
    />
        
    </>
}