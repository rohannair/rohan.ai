import { json } from "@sveltejs/kit";
// import type { Post } from "$lib/types";

async function getPostBySlug({ slug }: { slug: string }) {
  const { default: post, metadata } = await import(`/src/posts/${slug}.mdx`);

  return { post, metadata };
}

export async function GET({ params }: { params: { slug: string } }) {
  const resp = await getPostBySlug(params);

  return json(resp);
}
