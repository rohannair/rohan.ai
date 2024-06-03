export async function load({ params: { slug } }) {
  try {
    const filePath = String(`/src/posts/${slug}/index.mdx`);

    const { default: file, metadata } = await import(
      /* @vite-ignore */ filePath
    );
    const { html: post } = file.render();

    if (!post) {
      return {
        status: 404,
      };
    }

    return { post, metadata };
  } catch (error) {
    console.error({ error });
  }
}
