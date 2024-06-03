import { compile } from "mdsvex";
export const BLOG_PATH = "src/posts";

export async function getSlugs(): Promise<Error | string[]> {
  try {
    const posts = await import.meta.glob("../../posts/**/index.mdx");
    const slugs = Object.keys(posts).map((element) => {
      const lastIndex = element.lastIndexOf("/index.mdx");
      const firstIndex = element.lastIndexOf("/", lastIndex - 1) + 1;
      return element.slice(firstIndex, lastIndex);
    });
    return slugs;
  } catch (error) {
    console.error(`Error finding post slugs in getSlugs: ${error}`);
    return new Error("Error finding post slugs");
  }
}

type PostContent = {
  slug: string;
  content: string;
};

export async function getPostsContent(): Promise<Error | PostContent[]> {
  try {
    const postFiles = await import.meta.glob("../../content/blog/**/index.md");
    const postPromises = Object.keys(postFiles).map(async (element) => {
      await postFiles[element]();
      const lastIndex = element.lastIndexOf("/index.md");
      const firstIndex = element.lastIndexOf("/", lastIndex - 1) + 1;
      const slug = element.slice(firstIndex, lastIndex);
      const content = (await import(`${element}?raw`)).default;

      return { slug, content };
    });

    return Promise.all(postPromises);
  } catch (error) {
    console.error(`Error importing blog posts in getPostsContent: ${error}`);
    return new Error("Error finding post slugs");
  }
}

type Post = {
  datePublished: string;
  lastUpdated: string;
  postTitle: string;
  seoMetaDescription: string;
};

export const getPosts = async (postsContent: PostContent[], body = false) => {
  const postPromises = postsContent.map(async ({ content, slug }) => {
    const transformedContent = await compile(content);
    const { datePublished, lastUpdated, postTitle, seoMetaDescription } =
      transformedContent?.data?.fm as Post;

    return {
      datePublished,
      lastUpdated,
      postTitle,
      seoMetaDescription,
      slug,
      ...(body && { body: transformedContent?.code }),
    };
  });

  const result = await Promise.all(postPromises);
  return result.sort(
    (a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished)
  );
};
