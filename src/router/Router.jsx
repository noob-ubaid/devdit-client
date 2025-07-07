import { createBrowserRouter } from "react-router";
import Login from "../User/Login/Login";
import Register from "../User/Register/Register";
import MainLayout from "../layouts/MainLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    Component : MainLayout
  },
]);
