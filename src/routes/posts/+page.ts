export async function load() {
  const mdModules = import.meta.glob("../../posts/**/index.mdx");

  const posts = await Promise.all(
    Object.keys(mdModules).map(async (path) => {
      const slug = path.split("/").at(-2);
      const module = await mdModules[path]();

      // @ts-ignore
      return { ...module?.metadata, slug };
    })
  );

  return { posts: posts.filter((p) => Boolean(p.published)) };
}
