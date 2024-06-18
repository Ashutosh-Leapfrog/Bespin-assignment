import { RouteObject } from "react-router-dom";
import BlogsPage from "~/pages/Blogs";

const blogRoutes: RouteObject[] = [
  {
    index: true,
    element: <BlogsPage isUsersBlog />,
  },
];

export default blogRoutes;
