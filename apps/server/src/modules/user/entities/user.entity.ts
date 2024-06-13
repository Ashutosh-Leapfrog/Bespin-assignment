export default class User {
  id?: number;
  username: string;
  password: string;
  imageUrl: string;
  bio: string;
  email: string;

  constructor(
    username: string,
    password: string,
    imageUrl: string,
    bio: string,
    email: string,
  ) {
    this.username = username;
    this.password = password;
    this.imageUrl = imageUrl;
    this.bio = bio;
    this.email = email;
  }
}
