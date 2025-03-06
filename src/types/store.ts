import { store } from '@/store/store';
import { baseApi } from '@/store/api/baseApi';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ApiEndpoints = typeof baseApi.endpoints; 