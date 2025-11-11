export interface IPostBlog {
  title: string;
  description: string;
  imageUrl?: string;
  slug?: string;
  author?: IAuthor;
  date?: string;
  tags?: ITag[];
}

export interface ITag {
  name: string;
  slug?: string;
}

export interface IAuthor {
  name: string;
  avatarUrl?: string;
}