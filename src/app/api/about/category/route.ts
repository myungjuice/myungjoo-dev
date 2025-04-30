import { NextResponse } from 'next/server';

import { getErrorData } from '@/lib/get-error-data';

const PATH = '/api/about/category';

export const GET = async (request: Request) => {
  const backendUrl = process.env.BACKEND_API_BASE_URL;
  if (!backendUrl)
    return NextResponse.json(getErrorData('backendUrl is not defined.', 500, PATH), {
      status: 500,
    });

  const { searchParams } = new URL(request.url);
  if (!searchParams.get('lang'))
    return NextResponse.json(getErrorData('Missing "lang" query parameter.', 400, PATH), {
      status: 400,
    });

  const lang = searchParams.get('lang');

  try {
    const response = await fetch(`${backendUrl}/about/category?lang=${lang}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

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
