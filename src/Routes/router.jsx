import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root";
import Home from "../Layouts/Home";
import Auth from "../Layouts/Auth";
import Login from "../Components/Auth/Login";
import Register from './../Components/Auth/Register';
import Dashboard from "../Layouts/Dashboard";
import AdminHome from "../Components/DashboardPages/adminRoutes/AdminHome";
import AllUsers from "../Components/DashboardPages/adminRoutes/AllUsers";
import AllTasks from "../Components/DashboardPages/adminRoutes/AllTasks";
import WorkerHome from "../Components/DashboardPages/workerRoutes/WorkerHome";
 
import Submission from "../Components/DashboardPages/workerRoutes/Submission";
import Withdrawals from "../Components/DashboardPages/workerRoutes/Withdrawals";
import BuyerHome from "../Components/DashboardPages/buyerRoutes/BuyerHome";
import AddTask from "../Components/DashboardPages/buyerRoutes/AddTask";
import MyTasks from "../Components/DashboardPages/buyerRoutes/MyTasks";

import Transaction from "../Components/DashboardPages/buyerRoutes/Transaction";
import ErrorPage from "../Layouts/ErrorPage";
import Details from "../Components/DashboardPages/workerRoutes/Details";

import AdminRoute from "./AdminRoute";
import WorkerRoute from "./WorkerRoute";
import BuyerRoute from "./BuyerRoute";
import Purchase from "../Components/DashboardPages/buyerRoutes/Payment/Purchase";
import Payment from "../Components/DashboardPages/buyerRoutes/Payment/Payment";
import Update from "../Components/DashboardPages/buyerRoutes/Update";
import TaskList from "../Components/DashboardPages/workerRoutes/TaskList";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/> ,
        children: [
            {
                path: '/',
                element: <Home/>
            },
        ]
    },
    {
        path: "/auth",
        element: <Auth/>,
        errorElement: <ErrorPage/> ,
        children: [
            {
                path: '/auth',
                element: <Login/>
            },
            {
                path: '/auth/register',
                element: <Register/>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        errorElement: <ErrorPage/> ,
        children: [
            // admin routes
            {
                path: '/dashboard/adminhome',
                element: <AdminRoute><AdminHome/></AdminRoute>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers/></AdminRoute>
            },
            {
                path: '/dashboard/alltasks',
                element: <AdminRoute><AllTasks/></AdminRoute>
            },


            // worker routes
            {
                path: '/dashboard/userhome',
                element: <WorkerRoute><WorkerHome/></WorkerRoute>
            },
            {
                path: '/dashboard/tasklist',
                element: <WorkerRoute><TaskList/></WorkerRoute>
            },
            {
                path: '/dashboard/tasklist/:id',
                loader: ({params})=> fetch(`https://micro-job-server-93kovkwtf-jannat678s-projects.vercel.app/task/${params.id}`),
                element: <WorkerRoute><Details/></WorkerRoute>
            },
            {
                path: '/dashboard/submissions',
                element: <WorkerRoute><Submission/></WorkerRoute>
            },
            {
                path: '/dashboard/withdrawals',
                element: <WorkerRoute><Withdrawals/></WorkerRoute>  
            },

            // buyer routes
            {
                path: '/dashboard/buyerhome',
                element: <BuyerRoute><BuyerHome/></BuyerRoute>  
            },
            {
                path: '/dashboard/addtask',
                element: <BuyerRoute><AddTask/></BuyerRoute>  
            },
            {
                path: '/dashboard/update/:id',
                element: <BuyerRoute><Update/></BuyerRoute>  
            },
            {
                path: '/dashboard/mytasks',
                element: <BuyerRoute><MyTasks/></BuyerRoute>  
            },
            {
                path: '/dashboard/purchase',
                element: <BuyerRoute><Purchase/></BuyerRoute>  
            },
            {
                path: '/dashboard/purchase/:id',
                loader: ({params})=> fetch(`https://micro-job-server-93kovkwtf-jannat678s-projects.vercel.app/package/${params.id}`),
                element: <BuyerRoute><Payment/></BuyerRoute>  
            },
            {
                path: '/dashboard/transactions',
                element: <BuyerRoute><Transaction/></BuyerRoute>  
            },
        ]
    },
    
]);

export default router;