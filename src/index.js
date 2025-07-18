import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignIn  from "./pages/Auth/SignIn";
import SignUp  from "./pages/Auth/SignUp";
import Dashboard from  "../src/pages/Dashboard";
import HomeLayout from './layouts/layout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout.js';
import Questions from './pages/Questions';
import Question from './pages/Questions/Question/Question';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import enUS from "antd/lib/locale/en_US"; // Import the correct locale;

import { createContext } from 'react';
import  { data }  from './mocks/deafultData.js'
console.log("default data", data);
const MyContext = createContext(data);

function ContextProvider({ children }) {
  return (
    <MyContext.Provider value={data}>
      {children}
    </MyContext.Provider>
  );
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout/>,
    children: [
      { 
        index: true, 
        element: <SignIn/>
      },
      {
        path: "signup",
        element: <SignUp/>
      }
    ]
  },
  { 
    path: '/', 
    element: <ProtectedRoute><HomeLayout/></ProtectedRoute>,
    children: [
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
    {
      path:"questions",
      element: <Questions/>
    },
    {
      path:"question/new",
      element: <Question/>
    },
    {
      path:"question/:id",
      element: <Question/>
    }
  ]
    
  },
  // Catch-all route for 404 pages
  {
    path: "*",
    element: <NotFound/>
  },
  // Manual route for 500 errors (can be used programmatically)
  {
    path: "/500",
    element: <ServerError/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ConfigProvider locale={enUS}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
