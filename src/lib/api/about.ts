import { axiosInstance } from '@/lib/api';
import type { FetchAboutCategoryParams, AboutCategory } from '@/types/about';

export const fetchAboutCategory = async (
  params: FetchAboutCategoryParams
): Promise<AboutCategory[]> =>
  await axiosInstance.get('/api/about/category', {
    params,
  });
