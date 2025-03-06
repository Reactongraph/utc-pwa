import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeaturedContent } from "@/types/featured";

interface FeaturedState {
  list: FeaturedContent[];
  loading: boolean;
  error: string | null;
}

const initialState: FeaturedState = {
  list: [],
  loading: false,
  error: null,
};

const featuredSlice = createSlice({
  name: "featured",
  initialState,
  reducers: {
    setFeatured: (state, action: PayloadAction<FeaturedContent[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setFeatured } = featuredSlice.actions;
export default featuredSlice.reducer;
