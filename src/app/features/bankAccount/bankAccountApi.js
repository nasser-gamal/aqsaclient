import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const bankAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllBankAccounts: builder.query({
      query: ({ page, limit, order, sort }) => ({
        url: `${apiEndpoints.bankAccount.GET_BANKACCOUNTS}?page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
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
