import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignIn  from "../src/pages/SignIn";
import Dashboard from  "../src/pages/Dashboard";
import Layout from './layouts/layout';
import AuthLayout from './layouts/AuthLayout';
import Questions from './pages/Questions';
import Question from './pages/Questions/Question/Question';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import enUS from "antd/lib/locale/en_US"; // Import the correct locale

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout/>,
    children: [
      { 
        index: true, 
        element: <SignIn/>
      }, 
    ]
  },
  { 
    path: '/', 
    element: <Layout/>,
    children: [
      {
      path:"dashboard",
      element: <Dashboard/>
    },
    {
      path:"questions",
      element: <Questions/>
    },
    {
      path:"question/new",
      element: <Question/>
    }
  ]
    
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <ConfigProvider
      locale={enUS}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
