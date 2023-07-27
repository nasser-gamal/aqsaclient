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
      query: ({ userId, startDate, endDate, page, limit, order, sort }) => ({
        url: `${apiEndpoints.reports.EMPLOY_TRANSACTION}?userId=${userId}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['userTransaction'],
    }),
    findDailyTransfers: builder.query({
      query: ({ startDate, endDate, page, limit, order, sort }) => ({
        url: `${apiEndpoints.reports.DAILY_TRANSFER}?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['userTransaction'],
    }),
    findDailyFees: builder.query({
      query: ({ startDate, endDate, page, limit, order, sort }) => ({
        url: `${apiEndpoints.reports.DAILY_FEES}?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['feesReports'],
    }),
    findDailyCommissions: builder.query({
      query: ({ startDate, endDate, page, limit, order, sort }) => ({
        url: `${apiEndpoints.reports.DAILY_COMMISSIONS}?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['commissionsReports'],
    }),
  }),
});

export const {
  useFindUserTransactionsQuery,
  useFindDailyTransactionsQuery,
  useFindEmployTransactionsQuery,
  useFindDailyTransfersQuery,
  useFindDailyFeesQuery,
  useFindDailyCommissionsQuery,
} = reportsApi;
