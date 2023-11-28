import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const transactionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: (params) => ({
        url: `${apiEndpoints.TRANSACTIONS}`,
        params: { ...params },
      }),
      providesTags: ['transactions'],
    }),
    getTransactionAggregations: builder.query({
      query: (params) => ({
        url: `${apiEndpoints.TRANSACTIONS}/reports`,
        params: { ...params },
      }),
      providesTags: ['aggregation'],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetTransactionAggregationsQuery,
} = transactionsApiSlice;
