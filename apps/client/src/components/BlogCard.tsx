import { IBlog } from "~/interfaces/IBlog";

interface BlogsProps {
  blog: IBlog;
}

const BlogCard = (props: BlogsProps) => {
  const { blog } = props;
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>{blog.author.username}</p>
      <p>{blog.author.imageUrl}</p>
    </div>
  );
};

export default BlogCard;
