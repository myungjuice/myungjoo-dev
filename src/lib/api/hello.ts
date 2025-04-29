import { axiosInstance } from '@/lib/api';
import type { ApiSuccessResponse } from '@/types/api';
import type { FetchHelloParams, HelloResponse } from '@/types/hello';

export const fetchHello = async (
  params: FetchHelloParams
): Promise<ApiSuccessResponse<HelloResponse>> =>
  await axiosInstance.get('/hello', {
    params,
  });
