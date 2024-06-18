import { RouteObject } from "react-router-dom";
import routes from "~/constants/routes";
import FriendRequestPage from "~/pages/FriendRequests";
import FriendsPage from "~/pages/Friends";
import ProfilePage from "~/pages/Profile";
import ProfileEditForm from "~/pages/Profile/edit";

const userRoutes: RouteObject[] = [
  {
    index: true,
    element: <div>user</div>,
  },
  {
    path: routes.FRIENDS,
    element: <FriendsPage />,
  },
  {
    path: routes.REQUESTS,
    element: <FriendRequestPage />,
  },
  {
    path: "profile/:userId",
    element: <ProfilePage />,
  },
  {
    path: "profile/:userId/edit",
    element: <ProfileEditForm />,
  },
];

export default userRoutes;
