import { axiosInstance } from '@/lib/api';
import type { FetchAboutCategoryParams, AboutCategoryItem } from '@/types/about';

export const fetchAboutCategory = async (
  params: FetchAboutCategoryParams
): Promise<AboutCategoryItem[]> =>
  await axiosInstance.get('/api/about/category', {
    params,
  });
