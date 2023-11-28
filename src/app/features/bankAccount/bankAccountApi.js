import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const bankAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllBankAccounts: builder.query({
      query: (params) => ({
        url: apiEndpoints.BANK_ACCOUNTS,
        params: { ...params },
      }),
      providesTags: ['bankAccounts', 'deposite'],
    }),
    createBankAccount: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.BANK_ACCOUNTS,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['bankAccounts', 'deposite'],
    }),
    updateBankAccount: builder.mutation({
      query: ({ bankAccountId, form }) => ({
        url: `${apiEndpoints.BANK_ACCOUNTS}/${bankAccountId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['bankAccounts', 'deposite'],
    }),
    deleteBankAccount: builder.mutation({
      query: (bankAccountId) => ({
        url: `${apiEndpoints.BANK_ACCOUNTS}/${bankAccountId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bankAccounts', 'deposite'],
    }),
  }),
});

export const {
  useFindAllBankAccountsQuery,
  useCreateBankAccountMutation,
  useUpdateBankAccountMutation,
  useDeleteBankAccountMutation,
} = bankAccountApiSlice;
