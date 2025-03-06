import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import postsReducer from "./slices/postsSlice";
import featuredReducer from "./slices/featuredSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    posts: postsReducer,
    featured: featuredReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
