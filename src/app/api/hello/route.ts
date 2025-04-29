import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const backendUrl = process.env.BACKEND_API_BASE_URL;
  if (!backendUrl) throw new Error('BACKEND_API_BASE_URL is not defined.');

  const { searchParams } = new URL(request.url);
  if (!searchParams.get('lang')) throw new Error('Missing "lang" query parameter.');

  const lang = searchParams.get('lang');

  try {
    const response = await fetch(`${backendUrl}/hello?lang=${lang}`, {
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
      {
        success: false,
        statusCode: 500,
        data: {
          message: error instanceof Error ? error.message : 'Failed to fetch data from backend.',
          path: '/api/hello',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
};
