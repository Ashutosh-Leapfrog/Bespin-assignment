export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  bio: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
}
