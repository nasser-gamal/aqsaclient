import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const reportsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findUserTransactions: builder.query({
      query: ({
        bankAccountId,
        startDate,
        endDate,
        page,
        limit,
        order,
        sort,
      }) => ({
        url: `${apiEndpoints.reports.USER_TRANSACTION}?bankAccountId=${bankAccountId}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['userTransaction'],
    }),
    findDailyTransactions: builder.query({
      query: ({ startDate, endDate, page, limit, order, sort }) => ({
        url: `${apiEndpoints.reports.DAILY_TRANSACTION}?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['userTransaction'],
    }),
    findEmployTransactions: builder.query({
      query: ({
        userId,
        startDate,
        endDate,
        page,
        limit,
        order,
        sort,
      }) => ({
        url: `${apiEndpoints.reports.EMPLOY_TRANSACTION}?userId=${userId}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['userTransaction'],
    }),
    exportExcel: builder.mutation({
      query: ({ bankAccountId, startDate, endDate }) => ({
        url: `${apiEndpoints.reports.EXPORT_TRANSACTION}?bankAccountId=${bankAccountId}&startDate=${startDate}&endDate=${endDate}`,
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
