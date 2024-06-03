export type Categories = "general";

export type Post = {
  title: string;
  date: string;
  slug: string;
  description: string;
  categories: Categories[];
  published: boolean;
  summary: string;
  content: string;
};
