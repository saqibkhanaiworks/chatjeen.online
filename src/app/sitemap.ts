import { MetadataRoute } from 'next';

const BASE = 'https://chatjeen.online';
// Use a fixed date so crawlers don't re-queue every build unnecessarily
const LAST_MODIFIED = new Date('2025-06-01');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core pages — highest priority
    {
      url: BASE,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // SEO landing pages — high priority
    {
      url: `${BASE}/omegle-alternative`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/anonymous-chat`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/random-chat`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/talk-to-strangers`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/online-chat-rooms`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/voice-chat`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/free-chat-no-signup`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Mood landing pages — targeted SEO
    {
      url: `${BASE}/chat/philosophy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${BASE}/chat/gaming`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${BASE}/chat/music`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${BASE}/chat/travel`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${BASE}/chat/memes`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${BASE}/chat/2am`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    // Blog — content engine
    {
      url: `${BASE}/blog`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/art-of-talking-to-strangers`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/why-anonymous-chat-is-making-a-comeback`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/5-conversation-starters-that-actually-work`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Informational pages — medium priority
    {
      url: `${BASE}/faq`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/safety`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Legal pages — lower priority
    {
      url: `${BASE}/privacy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE}/terms`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];
}
