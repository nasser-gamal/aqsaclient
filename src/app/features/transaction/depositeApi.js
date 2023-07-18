import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const depositeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllDeposites: builder.query({
      query: () => ({
        url: apiEndpoints.deposite.GET_DEPOSITES,
      }),
      providesTags: ['deposite'],
    }),
    createDeposite: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.deposite.CREATE_DEPOSITE,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['deposite', 'bankAccounts'],
    }),
    updateDeposite: builder.mutation({
      query: ({ transactionId, form }) => ({
        url: `${apiEndpoints.deposite.UPDATE_DEPOSITE}/${transactionId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['deposite', 'bankAccounts'],
    }),
  }),
});

export const {
  useFindAllDepositesQuery,
  useCreateDepositeMutation,
  useUpdateDepositeMutation,
} = depositeApiSlice;
