import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const transferApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllTransfer: builder.query({
      query: ({ page, limit, order, sort }) => ({
        url: `${apiEndpoints.transfer.GET_TRANSFERS}?page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['transfers'],
    }),
    createTransfer: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.transfer.CREATE_TRANSFER,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['transfers', 'bankAccounts'],
    }),
    updateTransfer: builder.mutation({
      query: ({ transactionId, form }) => ({
        url: `${apiEndpoints.transfer.UPDATE_TRANSFER}/${transactionId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['transfers', 'bankAccounts'],
    }),
    deleteTransfer: builder.mutation({
      query: (transactionId) => ({
        url: `${apiEndpoints.transfer.DELETE_TRANSFER}/${transactionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['transfers', 'bankAccounts'],
    }),
  }),
});

export const {
  useFindAllTransferQuery,
  useCreateTransferMutation,
  useUpdateTransferMutation,
  useDeleteTransferMutation,
} = transferApiSlice;
