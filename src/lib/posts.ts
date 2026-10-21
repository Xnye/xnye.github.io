import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/**
 * Every published post, newest first. Drafts are filtered here rather than in
 * each page, so a draft can never leak into a route.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** `2026-10-20`, machine-ordered and locale-independent in shape. */
export const formatDate = (date: Date): string =>
  dateFormatter.format(date).replaceAll('/', '-');

/** The post URL, trailing slash included, so Pages never has to redirect. */
export const postHref = (post: Post): string => `/posts/${post.id}/`;
