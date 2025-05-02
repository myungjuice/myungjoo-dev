import { stringify } from 'qs';

import { axiosInstance } from '@/lib/api';
import type { FetchProjectParams, FetchProjectItem } from '@/types/projects';

export const fetchProjects = async (params: FetchProjectParams): Promise<FetchProjectItem[]> =>
  await axiosInstance.get('/api/projects', {
    params,
    paramsSerializer: params => stringify(params, { arrayFormat: 'repeat' }),
  });
