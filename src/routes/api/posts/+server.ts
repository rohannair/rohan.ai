import { json } from "@sveltejs/kit";
import type { Post } from "$lib/types";

async function getPosts() {
  const posts: Post[] = [];

  const paths = import.meta.glob("/src/posts/*.(md|mdx|svx)", {
    eager: true,
  });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace(".mdx", "");

    if (slug && file && typeof file === "object" && "metadata" in file) {
      const metadata = file.metadata as Omit<Post, "slug">;
      const post = { ...metadata, slug } satisfies Post;
      post.published && posts.push(post as Post);
    }
  }

  return posts.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime()
  );
}

export async function GET() {
  const posts = await getPosts();
  return json(posts);
}
