import { getPosts, CATEGORIES, fmt } from '../lib/site';
export async function GET() {
  const posts = await getPosts();
  const strip = s => (s || '').replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_`~\[\]()!|-]/g, ' ').replace(/\s+/g, ' ').trim();
  return new Response(JSON.stringify(posts.map(p => ({ u: `/posts/${p.id}/`, t: p.data.title, d: p.data.description, c: CATEGORIES[p.data.category], g: p.data.tags, dt: fmt(p.data.date), b: strip(p.body).slice(0, 5000) }))), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
