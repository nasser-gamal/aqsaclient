import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const subCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      query: (params) => ({
        url: apiEndpoints.SUB_CATEGORIES,
        params: { ...params },
      }),
      providesTags: ['subCategories'],
    }),
    createSubCategory: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.SUB_CATEGORIES,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['subCategories'],
    }),
    updateSubCategory: builder.mutation({
      query: ({ subCategoryId, form }) => ({
        url: `${apiEndpoints.SUB_CATEGORIES}/${subCategoryId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['subCategories'],
    }),
    deleteSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `${apiEndpoints.SUB_CATEGORIES}/${subCategoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['subCategories'],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApiSlice;
