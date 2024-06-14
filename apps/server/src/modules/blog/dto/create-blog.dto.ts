export class CreateBlogDto {
  title: string;
  link?: string;
  content: string;
  thumbnail?: string;
  authorId: number;
}
