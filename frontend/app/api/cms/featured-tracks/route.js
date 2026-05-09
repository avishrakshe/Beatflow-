import { NextResponse } from 'next/server';
import { cmsService } from '../../../../services/cms/contentService';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') || 12);
  const data = await cmsService.featuredTracks(limit);
  return NextResponse.json({ data, source: 'sanity' });
}
