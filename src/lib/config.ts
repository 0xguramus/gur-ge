// ── გარე სერვისების პარამეტრები. ცარიელი მნიშვნელობა = გამორთულია. ──

// ელფოსტით გამოწერა. მაგ. Buttondown: action = 'https://buttondown.com/api/emails/embed-subscribe/<username>', emailField = 'email'
// MailerLite: ჩასვი embedded form-ის action URL და emailField = 'fields[email]'
export const NEWSLETTER = {
  action: '',
  emailField: 'email',
  extraFields: {} as Record<string, string>,
};

// Giscus კომენტარები (GitHub Discussions). ჩართე მას შემდეგ, რაც giscus აპი დაინსტალირდება:
// https://github.com/apps/giscus
export const GISCUS = {
  enabled: false,
  repo: '0xguramus/gur-ge',
  repoId: 'R_kgDOVLi8AA',
  category: 'Announcements',
  categoryId: 'DIC_kwDOVLi8AM4DIlxe',
  lang: 'en', // giscus-ს ქართული ინტერფეისი ჯერ არ აქვს
};

// Cloudflare Web Analytics — ჩასვი token (Cloudflare → Analytics & Logs → Web Analytics → Add site)
export const CF_ANALYTICS_TOKEN = '';
