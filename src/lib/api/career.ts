import { stringify } from 'qs';

import { axiosInstance } from '@/lib/api';
import type { FetchCareerParams, FetchCareerItem } from '@/types/career';

export const fetchCareer = async (params: FetchCareerParams): Promise<FetchCareerItem[]> =>
  await axiosInstance.get('/api/career', {
    params,
    paramsSerializer: params => stringify(params, { arrayFormat: 'repeat' }),
  });
