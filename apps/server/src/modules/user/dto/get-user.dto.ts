export default class UserResponseDto {
  id: number;
  username: string;
  imageUrl: string;
  bio: string;
  email: string;

  constructor(
    id: number,
    username: string,
    imageUrl: string,
    bio: string,
    email: string,
  ) {
    this.id = id;
    this.username = username;
    this.imageUrl = imageUrl;
    this.bio = bio;
    this.email = email;
  }
}
