import { createBrowserRouter } from "react-router-dom";

import HomePage from "~/pages/Home";
import LoginPage from "~/pages/Login";
import NotFoundPage from "~/pages/NotFound";
import RegisterPage from "~/pages/Register";
import userRoutes from "./userRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import UnprotectedRoutes from "./UnprotectedRoutes";
import routes from "~/constants/routes";

const router = createBrowserRouter([
  {
    element: <UnprotectedRoutes />,
    children: [
      {
        path: routes.LOGIN,
        element: <LoginPage />,
      },
      {
        path: routes.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: routes.HOME,
        element: <HomePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: routes.USERS,
        children: userRoutes,
      },
    ],
  },
]);

export default router;
