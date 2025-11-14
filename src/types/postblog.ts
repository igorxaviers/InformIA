export interface IPostBlog {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedDate: string;
  imageUrl?: string;
  slug?: string;
  author?: IAuthor;
  date?: string;
  tags?: ITag[];
  comments?: IComment[];
}

export interface IPostBlogList extends Omit<IPostBlog, 'content' | 'publishedDate'> {
  imageUrl?: string;
  slug?: string;
  author?: IAuthor;
  date?: string;
  tags?: ITag[];
}

export interface IComment {
  id: string;
  postId: string;
  user: IUser;
  content: string;
  publishedDate: string;
}

export interface IUser {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  joinedDate: string;
}

export interface ITag {
  id: string;
  name: string;
  slug?: string;
}

export interface IAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
}