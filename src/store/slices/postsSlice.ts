import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/types/posts';

interface PostsState {
  selectedPost: Post | null;
  filters: {
    searchTerm: string;
    category: string;
  };
}

const initialState: PostsState = {
  selectedPost: null,
  filters: {
    searchTerm: '',
    category: 'all',
  },
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },
  },
});

export const { setSelectedPost, setSearchTerm, setCategory } = postsSlice.actions;
export default postsSlice.reducer; 