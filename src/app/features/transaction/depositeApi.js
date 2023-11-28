import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const depositeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllDeposites: builder.query({
      query: ({ page, limit, fields, sort, keyword, conditions }) => ({
        url: `${apiEndpoints.deposite.GET_DEPOSITES}?page=${page}&limit=${limit}&fields=${fields}&sort=${sort}&keyword=${keyword}&${conditions}`,
      }),
      providesTags: ['deposite'],
    }),
    createDeposite: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.deposite.CREATE_DEPOSITE,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: [
        'deposite',
        'bankAccounts',
        'userTransaction',
        'transactions',
        'aggregation',
      ],
    }),
    updateDeposite: builder.mutation({
      query: ({ transactionId, form }) => ({
        url: `${apiEndpoints.deposite.UPDATE_DEPOSITE}/${transactionId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: [
        'deposite',
        'bankAccounts',
        'userTransaction',
        'transactions',
        'aggregation',
      ],
    }),
    deleteDeposite: builder.mutation({
      query: (transactionId) => ({
        url: `${apiEndpoints.deposite.DELETE_DEPOSITE}/${transactionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'deposite',
        'bankAccounts',
        'userTransaction',
        'transactions',
        'aggregation',
      ],
    }),
    restoreDeposite: builder.mutation({
      query: (transactionId) => ({
        url: `${apiEndpoints.deposite.RESTORE_DEPOSITE}/${transactionId}`,
        method: 'put',
      }),
      invalidatesTags: [
        'deposite',
        'bankAccounts',
        'userTransaction',
        'transactions',
        'aggregation',
      ],
    }),
  }),
});

export const {
  useFindAllDepositesQuery,
  useCreateDepositeMutation,
  useUpdateDepositeMutation,
  useDeleteDepositeMutation,
  useRestoreDepositeMutation,
} = depositeApiSlice;
