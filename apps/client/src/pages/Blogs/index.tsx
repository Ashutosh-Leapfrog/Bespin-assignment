import { Fab } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { IoMdAdd } from "react-icons/io";
import { getBlogs } from "~/services/blog";

const BlogsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getBlogs"],
    queryFn: getBlogs,
  });
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl">Blogs</h1>

      <Fab
        className="fixed bottom-10 right-10"
        color="primary"
        aria-label="add"
      >
        <IoMdAdd />
      </Fab>
    </div>
  );
};

export default BlogsPage;
