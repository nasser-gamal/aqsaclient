import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const withDrawApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllWithDraw: builder.query({
      query: ({ page, limit, fields, sort, keyword, conditions }) => ({
        url: `${apiEndpoints.withdraw.GET_WITHDRAWS}?page=${page}&limit=${limit}&fields=${fields}&sort=${sort}&keyword=${keyword}&${conditions}`,
      }),
      providesTags: ['withdraw'],
    }),
    createWithDraw: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.withdraw.CREATE_WITHDRAW,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: [
        'withdraw',
        'bankAccounts',
        'userTransaction',
        'transactions',
        'aggregation',
      ],
    }),
    updateWithDraw: builder.mutation({
      query: ({ transactionId, form }) => ({
        url: `${apiEndpoints.withdraw.UPDATE_WITHDRAW}/${transactionId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: [
        'withdraw',
        'bankAccounts',
        'userTransaction',
        'transactions',
        'aggregation',
      ],
    }),
    deleteWithDraw: builder.mutation({
      query: (transactionId) => ({
        url: `${apiEndpoints.withdraw.DELETE_WITHDRAW}/${transactionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'withdraw',
        'bankAccounts',
        'userTransaction',
        'transactions',
        'aggregation',
      ],
    }),
    restoreWithDraw: builder.mutation({
      query: (transactionId) => ({
        url: `${apiEndpoints.withdraw.RESTORE_WITHDRAW}/${transactionId}`,
        method: 'put',
      }),
      invalidatesTags: [
        'withdraw',
        'bankAccounts',
        'userTransaction',
        'transactions',
        'aggregation',
      ],
    }),
  }),
});

export const {
  useFindAllWithDrawQuery,
  useCreateWithDrawMutation,
  useUpdateWithDrawMutation,
  useDeleteWithDrawMutation,
  useRestoreWithDrawMutation,
} = withDrawApiSlice;
