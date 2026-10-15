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
