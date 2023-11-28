import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const bankApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllBanks: builder.query({
      query: (params) => ({
        url: apiEndpoints.BANKS,
        params: { ...params },
      }),
      providesTags: ['banks'],
    }),
    createBank: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.BANKS,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['banks'],
    }),
    updateBank: builder.mutation({
      query: ({ bankId, form }) => ({
        url: `${apiEndpoints.BANKS}/${bankId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['banks'],
    }),
    deleteBank: builder.mutation({
      query: (bankId) => ({
        url: `${apiEndpoints.BANKS}/${bankId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['banks'],
    }),
  }),
});

export const {
  useFindAllBanksQuery,
  useCreateBankMutation,
  useUpdateBankMutation,
  useDeleteBankMutation,
} = bankApiSlice;
