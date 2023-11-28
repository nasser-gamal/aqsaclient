import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const transferApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransfers: builder.query({
      query: (params) => ({
        url: apiEndpoints.TRANSFER,
        params: { ...params },
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
        url: `${apiEndpoints.TRANSFER}/${transactionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['transfers', 'bankAccounts'],
    }),
  }),
});

export const {
  useGetTransfersQuery,
  useCreateTransferMutation,
  useUpdateTransferMutation,
  useDeleteTransferMutation,
} = transferApiSlice;
