import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "YOUR_API_BASE_URL",
  prepareHeaders: (headers, {}) => {
    // Get token from your auth state
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Create API interceptor
const baseQueryWithInterceptor = async (
  args: unknown,
  api: unknown,
  extraOptions: Parameters<typeof baseQuery>[2]
) => {
  const result = await baseQuery(
    args as Parameters<typeof baseQuery>[0],
    api as Parameters<typeof baseQuery>[1],
    extraOptions
  );

  if (result.error && result.error.status === 401) {
    // Handle unauthorized error
    // You can dispatch logout action or refresh token here
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  tagTypes: ["Posts", "Users", "Featured"],
});
