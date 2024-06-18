import { ICreateUser, IUser } from "~/interfaces/IUser";
import http from "../http";

const USER = "/user";
export const getUsers = async (): Promise<IUser[]> => {
  const { data } = await http.get(USER);
  return data;
};

export const getUser = async (id: number): Promise<IUser> => {
  const { data } = await http.get(`${USER}/${id}`);
  return data;
};

export const createUser = async (data: ICreateUser) => {
  const response = await http.post(USER, {
    ...data,
  });
  return response.data;
};

export const updateUser = async (id: number, data: ICreateUser) => {
  const response = await http.put(`${USER}/${id}`, {
    ...data,
  });
  return response.data;
};
