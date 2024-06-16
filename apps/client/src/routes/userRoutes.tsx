import { RouteObject } from "react-router-dom";
import routes from "~/constants/routes";

const userRoutes: RouteObject[] = [
  {
    index: true,
    element: <div>user</div>,
  },
  {
    path: routes.FRIENDS,
    element: <div>friends</div>,
  },
];

export default userRoutes;
