import { baseApi } from './baseApi';
import { FeaturedResponse, ContentType } from '@/types/featured';

export const featuredApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeatured: builder.query<FeaturedResponse, ContentType>({
      query: (type) => ({
        url: `/movie/featured`,
        params: { type },
      }),
      providesTags: ['Featured'],
    }),
  }),
});

export const { useGetFeaturedQuery } = featuredApi; 