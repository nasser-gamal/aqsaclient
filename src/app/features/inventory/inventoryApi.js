import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const inventoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findInventory: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `${apiEndpoints.inventory.GET_INVENTROY}?startDate=${startDate}&endDate=${endDate}`,
      }),
      providesTags: ['inventory'],
    }),
  }),
});

export const { useFindInventoryQuery } = inventoryApiSlice;
