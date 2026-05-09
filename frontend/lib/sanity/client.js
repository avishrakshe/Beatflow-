// Hackathon Hotfix: Bypassing Sanity to fix Vercel/rxjs build error
export const sanityClient = {};
export const urlFor = (source) => ({ url: () => source });
