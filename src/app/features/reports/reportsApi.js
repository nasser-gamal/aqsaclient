import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const reportsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findUserTransactions: builder.query({
      query: ({ bankNumber, startDate, endDate }) => ({
        url: `${apiEndpoints.reports.DAILY_TRANSACTION}?bankNumber=${bankNumber}&startDate=${startDate}&endDate=${endDate}`,
      }),
      providesTags: ['userTransaction'],
    }),
    exportExcel: builder.mutation({
      query: ({ bankNumber, startDate, endDate }) => ({
        url: `${apiEndpoints.reports.EXPORT_TRANSACTION}?bankNumber=${bankNumber}&startDate=${startDate}&endDate=${endDate}`,
        method: 'POST',
        responseType: 'arraybuffer',
        headers: { 'Content-Type': 'blob' },
      }),
      // invalidatesTags: ['userTransaction'],
    }),
  }),
});

export const { useFindUserTransactionsQuery, useExportExcelMutation } =
  reportsApi;
