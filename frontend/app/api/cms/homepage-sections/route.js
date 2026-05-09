import { NextResponse } from 'next/server';
import { cmsService } from '../../../../services/cms/contentService';

export async function GET() {
  const data = await cmsService.homepageSections();
  return NextResponse.json({ data, source: 'sanity' });
}
