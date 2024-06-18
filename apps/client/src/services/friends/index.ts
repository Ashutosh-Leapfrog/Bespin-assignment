import { IUser } from "~/interfaces/IUser";
import http from "../http";

export const getFriends = async (): Promise<IUser[]> => {
  const { data } = await http.get("/friends");
  return data;
};

export const sendRequest = async (id: number) => {
  const { data } = await http.post(`/friends/request`, {
    friendId: id,
  });

  return data;
};

export const acceptRequests = async (id: number) => {
  const { data } = await http.post(`/friends/accept`, {
    friendId: id,
  });

  return data;
};

export const declineRequests = async (id: number) => {
  await http.post(`/friends/cancel`, {
    friendId: id,
  });
};

export const getFriendRequests = async (): Promise<IUser[]> => {
  const { data } = await http.get("/friends/request");
  return data;
};

export const removeFriend = async (id: number) => {
  const { data } = await http.delete(`/friends/${id}`);
  return data;
};

export const getSentFriendRequests = async (): Promise<IUser[]> => {
  const { data } = await http.get("/friends/request/sent");
  return data;
};

export const getSuggestions = async (): Promise<IUser[]> => {
  const { data } = await http.get("/friends/suggestions");
  return data;
};
