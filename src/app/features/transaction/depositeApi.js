import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const depositeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllDeposites: builder.query({
      query: ({ page, limit, order, sort }) => ({
        url: `${apiEndpoints.deposite.GET_DEPOSITES}?page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['deposite'],
    }),
    createDeposite: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.deposite.CREATE_DEPOSITE,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['deposite'],
    }),
    updateDeposite: builder.mutation({
      query: ({ transactionId, form }) => ({
        url: `${apiEndpoints.deposite.UPDATE_DEPOSITE}/${transactionId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['deposite'],
    }),
    deleteDeposite: builder.mutation({
      query: (transactionId) => ({
        url: `${apiEndpoints.deposite.DELETE_DEPOSITE}/${transactionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['deposite'],
    }),
  }),
});

export const {
  useFindAllDepositesQuery,
  useCreateDepositeMutation,
  useUpdateDepositeMutation,
  useDeleteDepositeMutation,
} = depositeApiSlice;
