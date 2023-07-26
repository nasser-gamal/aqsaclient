import apiEndpoints from '../../../utils/endpoints';
import { apiSlice } from '../../api/apiSlice';

export const profitsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllProfits: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `${apiEndpoints.profits.GET_DAILY_PROFITS}?startDate=${startDate}&endDate=${endDate}`,
      }),
      providesTags: ['profits'],
    }),
  }),
});

export const { useFindAllProfitsQuery } = profitsApiSlice;
