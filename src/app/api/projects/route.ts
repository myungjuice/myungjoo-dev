import { NextResponse } from 'next/server';

import { getErrorData } from '@/lib/get-error-data';

const PATH = '/api/projects';

export const GET = async (request: Request) => {
  const backendUrl = process.env.BACKEND_API_BASE_URL;
  if (!backendUrl)
    return NextResponse.json(getErrorData('backendUrl is not defined.', 500, PATH), {
      status: 500,
    });

  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang');
  const tech = searchParams.getAll('tech');

  if (!lang)
    return NextResponse.json(getErrorData('Missing "lang" query parameter.', 400, PATH), {
      status: 400,
    });

  try {
    const params = new URLSearchParams();
    params.append('lang', lang);
    tech.forEach(k => params.append('tech', k));

    const response = await fetch(`${backendUrl}/project?${params.toString()}`, {
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
