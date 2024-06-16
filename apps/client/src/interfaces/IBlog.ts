export interface IBlog {
  id: number;
  title: string;
  link?: string;
  content: string;
  thumbnail?: string;
  authorId: number;
}

export interface ICreateBlog {
  title: string;
  link?: string;
  content: string;
  thumbnail?: string;
  authorId: number;
}
