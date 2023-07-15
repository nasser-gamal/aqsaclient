import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const bankAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllBankAccounts: builder.query({
      query: () => ({
        url: apiEndpoints.bankAccount.GET_BANKACCOUNTS,
      }),
      providesTags: ['bankAccounts'],
    }),
    createBankAccount: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.bankAccount.CREATE_BANKACCOUNT,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['bankAccounts'],
    }),
    updateBankAccount: builder.mutation({
      query: ({ bankAccountId, form }) => ({
        url: `${apiEndpoints.bankAccount.UPDATE_BANKACCOUNT}/${bankAccountId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['bankAccounts'],
    }),
  }),
});

export const {
  useFindAllBankAccountsQuery,
  useCreateBankAccountMutation,
  useUpdateBankAccountMutation,
} = bankAccountApiSlice;
