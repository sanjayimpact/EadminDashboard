import { createBrowserRouter } from "react-router-dom";
import Login from "../Page/Login";
import Dashboard from "../Page/Dashboard";
import ProtectedRoute from "../ProtectedRoute/AuthProtected";

import Settings from "../Page/Setting";
import PublicRoute from "../ProtectedRoute/PublicRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import Consumers from "../Page/Consumer";
import Products from "../Page/Products";
import OtpVerifyForm from "../Page/Twostep";
export const Router = createBrowserRouter([
  {
        path: "/2step",
        element: <OtpVerifyForm/>,
  }
  ,

  {
    element:<PublicRoute/>,
    children:[
      {
        path: '/',
    element: <Login></Login>
      },
       
    ]
  },
  {
    element:(
    <ProtectedRoute/>
     

  ),
    children: [
      {
        element:<DashboardLayout/>,
        children:[
          {
        
        path: '/dashboard',
        element: 
          <Dashboard/>

       
      }, {
        path: "/consumers",
        element: <Consumers/>,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/products",
        element: <Products/>,
      }
     
        ]
      }
    ]

  }
])