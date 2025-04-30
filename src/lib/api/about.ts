import { axiosInstance } from '@/lib/api';
import type {
  FetchAboutCategoryParams,
  AboutCategoryItem,
  FetchAboutParams,
  AboutResponse,
} from '@/types/about';

export const fetchAboutCategory = async (
  params: FetchAboutCategoryParams
): Promise<AboutCategoryItem[]> =>
  await axiosInstance.get('/api/about/category', {
    params,
  });

export const fetchAbout = async (params: FetchAboutParams): Promise<AboutResponse> =>
  await axiosInstance.get('/api/about', {
    params,
  });
