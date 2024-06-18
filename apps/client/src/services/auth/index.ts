import http from "../http";
import { ICreateUser } from "~/interfaces/IUser";
import { ILogin } from "~/interfaces/ILogin";

export const login = async (data: ILogin) => {
  const response = await http.post("/auth/login", {
    ...data,
  });
  return response.data;
};

export const register = async (data: ICreateUser) => {
  const response = await http.post("/auth/register", {
    ...data,
  });
  return response.data;
};

export const verifyUser = async () => {
  const response = await http.get("/auth/me");
  return response.data;
};
