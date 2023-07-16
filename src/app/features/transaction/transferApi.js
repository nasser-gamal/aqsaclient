import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const transferApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllTransfer: builder.query({
      query: () => ({
        url: apiEndpoints.transfer.GET_TRANSFERS,
      }),
      providesTags: ['transfers'],
    }),
    createTransfer: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.transfer.CREATE_TRANSFER,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['transfers'],
    }),
    updateTransfer: builder.mutation({
      query: ({ transactionId, form }) => ({
        url: `${apiEndpoints.transfer.UPDATE_TRANSFER}/${transactionId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['transfers'],
    }),
  }),
});

export const {
  useFindAllTransferQuery,
  useCreateTransferMutation,
  useUpdateTransferMutation,
} = transferApiSlice;
