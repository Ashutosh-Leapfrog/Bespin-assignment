import { Fab } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

import BlogCard from "~/components/BlogCard";
import CreateBlogForm from "~/components/CreateBlogForm";
import Error from "~/components/Error";
import Loading from "~/components/Loading";
import { IBlog } from "~/interfaces/IBlog";
import { getBlogs, getBlogsByUser } from "~/services/blog";
import ProfileService from "~/services/ProfileService";

interface BlogsPageProps {
  isUsersBlog: boolean;
}

const BlogsPage = (props: BlogsPageProps) => {
  const { isUsersBlog } = props;

  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const getUserId = async () => {
      const user = await ProfileService.getUserId();
      setUserId(user ?? 0);
    };

    getUserId();
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getBlogs"],
    queryFn: getBlogs,
    enabled: !isUsersBlog,
  });

  const { data: userBlogs } = useQuery({
    queryKey: ["getBlogsByUser", userId],
    queryFn: async () => {
      return await getBlogsByUser(userId);
    },
    enabled: isUsersBlog,
  });

  const blogData: IBlog[] = isUsersBlog ? userBlogs : data;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center ">
      {isUsersBlog ? <h1 className="text-2xl mb-4">My Blogs</h1> : ""}

      {blogData?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}

      <CreateBlogForm />
      {isUsersBlog && (
        <div className="absolute bottom-10 right-20">
          <Fab color="primary" aria-label="add">
            <IoMdAdd />
          </Fab>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
