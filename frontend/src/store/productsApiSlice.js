// frontend/src/store/productsApiSlice.js
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({ url: '/api/products', params: { keyword } }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({ url: `/api/products/${productId}` }),
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/api/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/api/products/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.productId }],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({ url: `/api/products/${productId}`, method: 'DELETE' }),
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
        query: (data) => ({
          url: `/api/upload`,
          method: 'POST',
          body: data,
        }),
      }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `/api/products/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.productId }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useCreateReviewMutation,
} = productsApiSlice;