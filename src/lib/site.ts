import { getCollection } from 'astro:content';
export const SITE = { title: 'gur.ge', description: 'პირადი ჩანაწერები ფსიქოლოგიაზე, ჯანსაღ ცხოვრებაზე, ბიზნესსა და მარკეტინგზე.' };
export const CATEGORIES = {
  psychology: 'ფსიქოლოგია',
  health: 'ჯანსაღი ცხოვრება',
  business: 'ბიზნესი და მარკეტინგი',
  notes: 'ჩანაწერები',
} as const;
export type Cat = keyof typeof CATEGORIES;
const MONTHS = ['იანვარი','თებერვალი','მარტი','აპრილი','მაისი','ივნისი','ივლისი','აგვისტო','სექტემბერი','ოქტომბერი','ნოემბერი','დეკემბერი'];
export const fmt = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
export async function getPosts() {
  return (await getCollection('posts', p => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
}

export const tagSlug = (t: string) => t.trim().toLowerCase().replace(/\s+/g, '-');
export const readingTime = (body = '') => {
  const words = body.replace(/[#>*_`\[\]()!-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
};
export const rtLabel = (min: number) => `${min} წთ საკითხავი`;
export async function getTags() {
  const map = new Map<string, { name: string; count: number }>();
  for (const p of await getPosts()) for (const t of p.data.tags) {
    const k = tagSlug(t); const e = map.get(k) ?? { name: t.trim(), count: 0 }; e.count++; map.set(k, e);
  }
  return [...map.entries()].map(([slug, v]) => ({ slug, ...v })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ka'));
}
