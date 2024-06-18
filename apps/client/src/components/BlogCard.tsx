import { IBlog } from "~/interfaces/IBlog";
import AvatarImage from "./AvatarImage";
import { Divider } from "@mui/material";

interface BlogsProps {
  blog: IBlog;
}

const BlogCard = (props: BlogsProps) => {
  const { blog } = props;
  return (
    <div className="w-full mb-4 mx-2 max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 hover:cursor-pointer">
      <div className="flex flex-col justify-center mb-4 gap-4">
        <h1 className="text-xl">{blog.title}</h1>
        <p className="text-sm text-gray-500 pl-2">{blog.content}</p>
      </div>
      <Divider />
      <div className="flex items-center gap-6 mt-3">
        <AvatarImage
          className="w-10 h-10"
          src={blog.author.imageUrl}
          alt={blog.author.username}
        />
        <p>{blog.author.username}</p>
      </div>
    </div>
  );
};

export default BlogCard;
