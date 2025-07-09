import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Membership from "../Pages/Membership/Membership";
import Login from "../User/Login/Login";
import Register from "../User/Register/Register";
import PrivateRoute from "../contexts/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/membership",
        Component: Membership,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
  },
  
]);
