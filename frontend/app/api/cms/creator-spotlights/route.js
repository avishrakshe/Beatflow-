import { NextResponse } from 'next/server';
import { cmsService } from '../../../../services/cms/contentService';

export async function GET() {
  const data = await cmsService.creatorSpotlights();
  return NextResponse.json({ data, source: 'sanity' });
}
