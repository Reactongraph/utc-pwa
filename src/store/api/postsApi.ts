import { baseApi } from './baseApi';
import { Post, CreatePostDto, UpdatePostDto } from '@/types/posts';
import { ApiResponse } from '@/types/api';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      transformResponse: (response: ApiResponse<Post[]>) => response.data,
      providesTags: ['Posts'],
    }),
    
    getPostById: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
      transformResponse: (response: ApiResponse<Post>) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Posts', id }],
    }),
    
    createPost: builder.mutation<Post, CreatePostDto>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<Post>) => response.data,
      invalidatesTags: ['Posts'],
    }),
    
    updatePost: builder.mutation<Post, UpdatePostDto>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      transformResponse: (response: ApiResponse<Post>) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Posts', id },
        'Posts',
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} = postsApi; 