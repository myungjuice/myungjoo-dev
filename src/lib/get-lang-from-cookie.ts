import { headers } from 'next/headers';

export const getLangFromCookie = async () => {
  const headersList = await headers();
  const cookieHeader = headersList.get('cookie');

  let lang = 'ko';

  if (cookieHeader) {
    const match = cookieHeader.match(/NEXT_LANG=([^;]*)/);
    if (match) {
      lang = match[1];
    }
  }

  return lang;
};
