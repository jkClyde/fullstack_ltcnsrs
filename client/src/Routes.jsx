import {createBrowserRouter, Navigate} from "react-router-dom";
import React, { useState , useEffect} from "react"; // Import React and useState
// import GuestLayout from './components/layouts/GuestLayout';
// import UserLayout from "./components/layouts/UserView";
// import DefaultLayout from './components/layouts/DefaultLayout';

import GuestLayout from "./components/Layouts/GuestLayout";
import UserLayout from "./components/Layouts/UserView";
import  DefaultLayout from "./components/Layouts/DefaultLayout";

import Login from "./scenes/account/Login";
import Signup from "./scenes/account/Signup";

import Dashboard from "./scenes/Dashboard";
import Table from "./scenes/Database/Table";
import Form from "./scenes/form/Form";
import Calendar from "./scenes/calendar/Calendar";
import BarChart from "./scenes/charts/BarChart/index";
import Pie from "./scenes/Charts/PieChart";
import Line from "./scenes/charts/Line/index";
import UserProfile from "./scenes/profile";
import Users from "./scenes/users";
import PatientProfile from './scenes/patient_profile/index'
import VerificationNotice from "./components/registration/verificationNotice";
import Verify from "./components/registration/verify";

import UserDrawer from "./scenes/global/UserDrawer";
import ExcelTester from "./scenes/Import/ExcelTester";
import ExcelToJSON from "./scenes/Import"
import ExcelDataTransfer from "./scenes/export";
import { useStateContext } from "./contexts/ContextProvider";
import jwtDecode from 'jwt-decode';

import Statistics from "./scenes/Database/Calculations/Statistics";
import LoadingPage from "./components/LoadingPage";
import BackupRestore from "./scenes/backupRestore";





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
        element: <ExcelDataTransfer />
      },
      {
        path: '/stat',
        element: <Statistics />
      },
       {
        path: '/tester',
        element: <ExcelTester />
      },
      {
        path: '/backupRestore',
        element: <BackupRestore />
      },
      // {
      //   path: '/auditLogs',
      //   element: <AuditLogs />
      // },
    
      
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
        path: '/database',
        element: <Table/>
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
      },
      {
        path: '/loading',
        element: <LoadingPage />
      },
    ]
  },
])

export default MyRoutes;