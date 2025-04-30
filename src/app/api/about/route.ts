import { NextResponse } from 'next/server';

import { getErrorData } from '@/lib/get-error-data';

const PATH = '/api/about';

export const GET = async (request: Request) => {
  const backendUrl = process.env.BACKEND_API_BASE_URL;
  if (!backendUrl)
    NextResponse.json(getErrorData('backendUrl is not defined.', 500, PATH), { status: 500 });

  const { searchParams } = new URL(request.url);
  if (!searchParams.get('lang'))
    NextResponse.json(getErrorData('Missing "lang" query parameter.', 400, PATH), { status: 400 });
  if (!searchParams.get('tabKey'))
    NextResponse.json(getErrorData('Missing "tabKey" query parameter.', 400, PATH), {
      status: 400,
    });
  if (!searchParams.get('menuKey'))
    NextResponse.json(getErrorData('Missing "menuKey" query parameter.', 400, PATH), {
      status: 400,
    });

  const lang = searchParams.get('lang');
  const tabKey = searchParams.get('tabKey');
  const menuKey = searchParams.get('menuKey');

  try {
    const response = await fetch(
      `${backendUrl}/about?lang=${lang}&tabKey=${tabKey}&menuKey=${menuKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      getErrorData(
        error instanceof Error ? error.message : 'Failed to fetch data from backend.',
        500,
        PATH
      ),
      { status: 500 }
    );
  }
};
