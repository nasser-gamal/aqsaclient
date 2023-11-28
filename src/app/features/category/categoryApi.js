import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllCategories: builder.query({
      query: (params) => ({
        url: apiEndpoints.CATEGORIES,
        params: { ...params },
      }),
      providesTags: ['categories'],
    }),
    createCategory: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.CATEGORIES,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['categories'],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, form }) => ({
        url: `${apiEndpoints.CATEGORIES}/${categoryId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['categories'],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${apiEndpoints.CATEGORIES}/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categories'],
    }),
  }),
});

export const {
  useFindAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
