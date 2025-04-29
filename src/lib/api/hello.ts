import { axiosInstance } from '@/lib/api';
import type { FetchHelloParams, HelloResponse } from '@/types/hello';

export const fetchHello = async (params: FetchHelloParams): Promise<HelloResponse> =>
  await axiosInstance.get('/api/hello', {
    params,
  });
