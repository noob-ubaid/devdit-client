import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Membership from "../Pages/Membership/Membership";
import Login from "../User/Login/Login";
import Register from "../User/Register/Register";
import PrivateRoute from "../contexts/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/Myprofile/MyProfile";
import AddPost from "../Pages/Dashboard/Addpost/AddPost";
import MyPost from "../Pages/Dashboard/MyPost/MyPost";
import AdminProfile from "../Pages/Admin/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Admin/ManageUsers/ManageUsers";
import Announcement from "../Pages/Admin/Announcement/Announcement";
import Details from "../Pages/Home/Details/Details";
import Comments from "../Pages/Home/Comments/Comments";
import AdminRoute from "../contexts/AdminRoute";
import useDashboardHomeRedirect from "../hooks/useDashboardRedirect";
import Reports from "../Pages/Admin/Reports/Reports";
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
      {
        path: "/post/:id",
        Component: Details,
      },
      {
        path: "/comments/:id",
        Component: Comments,
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
    children: [
      {
        index: true,
        Component: useDashboardHomeRedirect,
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
      {
        path: "addPost",
        Component: AddPost,
      },
      {
        path: "myPost",
        Component: MyPost,
      },
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>{" "}
          </AdminRoute>
        ),
      },
      {
        path: "announcement",
        element: (
          <AdminRoute>
            <Announcement></Announcement>
          </AdminRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <AdminRoute>
            <Reports></Reports>
          </AdminRoute>
        ),
      },
    ],
  },
]);
