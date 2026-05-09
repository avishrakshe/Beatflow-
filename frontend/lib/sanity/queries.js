export const cmsQueries = {
  featuredTracks: `*[_type == "track" && featured == true]|order(releaseDate desc)[0...$limit]{
    _id,title,slug,genre->{title},artist->{name,slug},coverImage,audioPreview,pricePerStream,status
  }`,
  trendingPlaylists: `*[_type == "playlist" && isTrending == true]|order(priority asc)[0...$limit]{
    _id,title,slug,description,coverImage,tracks[]->{_id,title,artist->{name}}
  }`,
  homepageSections: `*[_type == "homepageContent"][0]{
    heroTitle,heroSubtitle,featuredReleases[]->{_id,title,slug,coverImage},platformBanners[]->{_id,title,image,ctaText,ctaUrl}
  }`,
  creatorSpotlights: `*[_type == "creatorSpotlight" && active == true]|order(priority asc){
    _id,title,summary,artist->{_id,name,slug,avatar,bannerImage}
  }`,
  announcements: `*[_type == "announcement" && active == true]|order(publishedAt desc)[0...$limit]{
    _id,title,slug,excerpt,content,publishedAt,priority
  }`,
  blogsNews: `*[_type == "blogPost"]|order(publishedAt desc)[0...$limit]{
    _id,title,slug,excerpt,content,coverImage,author->{name},tags[]->{title},publishedAt
  }`,
  recommendations: `*[_type == "platformRecommendation" && active == true]|order(priority asc)[0...$limit]{
    _id,title,recommendationType,targetType,targetRef,payload,active
  }`,
};
