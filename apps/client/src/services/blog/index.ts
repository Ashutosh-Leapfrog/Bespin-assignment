import { IBlog, ICreateBlog } from "~/interfaces/IBlog";
import http from "../http";

const BLOGS = "/blog";

export const getBlogs = async () => {
  const { data } = await http.get(BLOGS);
  return data;
};

export const getBlog = async (id: number) => {
  const { data } = await http.get(`${BLOGS}/${id}`);
  return data;
};

export const createBlog = async (data: ICreateBlog) => {
  const response = await http.post(BLOGS, data);
  return response.data;
};

export const updateBlog = async (id: number, data: IBlog) => {
  const response = await http.put(`${BLOGS}/${id}`, data);
  return response.data;
};

export const deleteBlog = async (id: number) => {
  const response = await http.delete(`${BLOGS}/${id}`);
  return response.data;
};

export const getBlogsByUser = async (userId: number) => {
  const { data } = await http.get(`${BLOGS}/user/${userId}`);
  return data;
};
