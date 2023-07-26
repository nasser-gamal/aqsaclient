import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const treasuryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findTreasury: builder.query({
      query: () => ({
        url: apiEndpoints.treasury.GET_TREASURY,
      }),
      providesTags: ['treasury'],
    }),
  }),
});

export const { useFindTreasuryQuery } = treasuryApiSlice;
