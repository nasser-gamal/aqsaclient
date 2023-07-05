import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllCategories: builder.query({
      query: () => ({
        url: apiEndpoints.category.GET_CATEGORIES,
      }),
      providesTags: ['categories'],
    }),
    createCategory: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.category.CREATE_CATEGORY,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['categories'],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, form }) => ({
        url: `${apiEndpoints.category.UPDATE_CATEGORY}/${categoryId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['categories'],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${apiEndpoints.category.DELETE_CATEGORY}/${categoryId}`,
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
