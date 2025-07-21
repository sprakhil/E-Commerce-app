// frontend/src/store/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '', // Uses proxy
  prepareHeaders: (headers, { getState }) => {
    const { userInfo } = getState().auth;
    if (userInfo && userInfo.token) {
      headers.set('authorization', `Bearer ${userInfo.token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});