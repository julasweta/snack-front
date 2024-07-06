import { Navigate, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { AppRoutes } from "./AppRoutes";
import Error404 from "../components/Error404";
import SnakeGame from "../components/SnakeGame";
import LoginForm from "../components/LoginForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={AppRoutes.LOGIN} />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
      {
        path: AppRoutes.GAME,
        element: <SnakeGame />,
      },
      {
        path: AppRoutes.LOGIN,
        element: <LoginForm />,
      },
    ],
  },
]);