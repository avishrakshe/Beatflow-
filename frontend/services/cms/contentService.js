import { sanityClient } from '../../lib/sanity/client';
import { cmsQueries } from '../../lib/sanity/queries';

async function queryOrEmpty(query, params = {}, fallback = []) {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return fallback;
    return await sanityClient.fetch(query, params, { next: { revalidate: 120 } });
  } catch (_err) {
    return fallback;
  }
}

export const cmsService = {
  featuredTracks: (limit = 12) => queryOrEmpty(cmsQueries.featuredTracks, { limit }),
  trendingPlaylists: (limit = 10) => queryOrEmpty(cmsQueries.trendingPlaylists, { limit }),
  homepageSections: () => queryOrEmpty(cmsQueries.homepageSections, {}, {}),
  creatorSpotlights: () => queryOrEmpty(cmsQueries.creatorSpotlights, {}),
  announcements: (limit = 8) => queryOrEmpty(cmsQueries.announcements, { limit }),
  blogsNews: (limit = 8) => queryOrEmpty(cmsQueries.blogsNews, { limit }),
  recommendations: (limit = 12) => queryOrEmpty(cmsQueries.recommendations, { limit }),
};
