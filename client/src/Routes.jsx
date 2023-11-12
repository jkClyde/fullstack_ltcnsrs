import {createBrowserRouter, Navigate} from "react-router-dom";
import React, { useState , useEffect} from "react"; // Import React and useState
import GuestLayout from './components/GuestLayout';
import Login from "./scenes/account/Login";
import Signup from "./scenes/account/Signup";

import DefaultLayout from './components/DefaultLayout';
import Dashboard from "./scenes/Dashboard";
import Table from "./scenes/Database/Table";
import Form from "./scenes/form/Form";
import Calendar from "./scenes/calendar/Calendar";
import Geography from "./scenes/Charts/Geography";
import BarChart from "./scenes/charts/BarChart/index";
import Pie from "./scenes/Charts/PieChart";
import Line from "./scenes/charts/Line/index";
import UserProfile from "./scenes/profile";
import Users from "./scenes/users";
import PatientProfile from './scenes/patient_profile/index'
import VerificationNotice from "./components/registration/verificationNotice";
import Verify from "./components/registration/verify";
import UserLayout from "./components/UserView";
import UserDrawer from "./scenes/global/UserDrawer";
// import ExcelReader from "./scenes/Import";
import ExcelToJSON from "./scenes/Import"
import ExcelDataTransfer from "./scenes/export";
import { useStateContext } from "./contexts/ContextProvider";
import jwtDecode from 'jwt-decode';




let isAdmin = false;

const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
if(storedToken){
  const decodedToken = jwtDecode(storedToken.data.access);
  if(decodedToken.is_admin){
      isAdmin = true;
  }
}


 

const admin_route = [
      {
        path: '/',
        element: <Navigate to='/dashboard'/>
      },
      {
        path: '/dashboard',
        element:<Dashboard />
      },
      {
        path: '/database',
        element: <Table/>
      },
      {
        path: '/form',
        element: <Form/>
      },
      {
        path: '/calendar',
        element: <Calendar/>
      },
      {
        path: '/bar',
        element: <BarChart/>
      },
      {
        path: '/pie',
        element: <Pie/>
      },
      {
        path: '/line',
        element: <Line/>
      },
      {
        path: '/geography',
        element: <Geography/>
      },
      {
        path: '/profile',
        element: <UserProfile/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/profile2',
        element: <PatientProfile/>
      },
      {
        path: '/ul',
        element: <UserLayout/>
      },
      {
        path: '/import',
        element: <ExcelToJSON/>
      },
      {
        path: '/export',
        element: <ExcelDataTransfer/>
      },
]

const user_route = [
      {
        path: '/',
        element: <Navigate to='/dashboard'/>
      },
      {
        path: '/dashboard',
        element:<Dashboard />
      },
      {
        path: '/form',
        element: <Form/>
      },
      {
        path: '/calendar',
        element: <Calendar/>
      },
      {
        path: '/bar',
        element: <BarChart/>
      },
      {
        path: '/pie',
        element: <Pie/>
      },
      {
        path: '/line',
        element: <Line/>
      },
      {
        path: '/geography',
        element: <Geography/>
      },
      {
        path: '/profile',
        element: <UserProfile/>
      },
]




const MyRoutes = createBrowserRouter([
  {
    path: '/',
    element: isAdmin ? <DefaultLayout /> : <UserLayout />,
    children: [
      ...(isAdmin ? admin_route : user_route),
    ]
  },

  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path:'/signup',
        element: <Signup/>
      },
      {
        path:'/notice',
        element: <VerificationNotice/>
      },
      {
        path:'/activate/:uid/:token',
        element: <Verify/>
      }
      
    ]
  },
])

export default MyRoutes;