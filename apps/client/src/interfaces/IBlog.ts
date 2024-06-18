export interface IBlog {
  id: number;
  title: string;
  link?: string;
  content: string;
  thumbnail?: string;
  authorId: number;
  author: {
    username: string;
    imageUrl: string;
  };
}

export interface ICreateBlog {
  title: string;
  link?: string;
  content: string;
  thumbnail?: string;
  authorId: number;
}
