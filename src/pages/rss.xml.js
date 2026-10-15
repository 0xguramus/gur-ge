import rss from '@astrojs/rss';
import { getPosts, SITE } from '../lib/site';
export async function GET(context) {
  const posts = await getPosts();
  return rss({ title: SITE.title, description: SITE.description, site: context.site,
    items: posts.map(p => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: `/posts/${p.id}/`,
      ...(p.data.image ? { enclosure: { url: new URL(p.data.image, context.site).href, type: p.data.image.endsWith('.png') ? 'image/png' : 'image/jpeg', length: 0 } } : {}) })) });
}
