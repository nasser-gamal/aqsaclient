import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const reportsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findUserTransactions: builder.query({
      query: ({ bankNumber, startDate, endDate }) => ({
        url: `${apiEndpoints.reports.USER_TRANSACTION}?bankNumber=${bankNumber}&startDate=${startDate}&endDate=${endDate}`,
      }),
      providesTags: ['userTransaction'],
    }),
    findDailyTransactions: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `${apiEndpoints.reports.DAILY_TRANSACTION}?startDate=${startDate}&endDate=${endDate}`,
      }),
      providesTags: ['userTransaction'],
    }),
    findEmployTransactions: builder.query({
      query: ({ userId, startDate, endDate }) => ({
        url: `${apiEndpoints.reports.EMPLOY_TRANSACTION}?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
      }),
      providesTags: ['userTransaction'],
    }),
    exportExcel: builder.mutation({
      query: ({ bankNumber, startDate, endDate }) => ({
        url: `${apiEndpoints.reports.EXPORT_TRANSACTION}?bankNumber=${bankNumber}&startDate=${startDate}&endDate=${endDate}`,
        method: 'POST',
        headers: { 'Content-Type': 'blob' },
        responseType: 'arraybuffer',
      }),
      // invalidatesTags: ['userTransaction'],
    }),
  }),
});

export const {
  useFindUserTransactionsQuery,
  useFindDailyTransactionsQuery,
  useFindEmployTransactionsQuery,
  useExportExcelMutation,
} = reportsApi;
