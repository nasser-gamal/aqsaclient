import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const agentTreasuryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllAgentTreasury: builder.query({
      query: ({ page, limit, fields, sort, keyword, conditions }) => ({
        url: `${apiEndpoints.AGENT_TREASURIES}?page=${page}&limit=${limit}&fields=${fields}&sort=${sort}&keyword=${keyword}&${conditions}`,
      }),
      providesTags: ['agentTreasuries'],
    }),
    createAgentTreasury: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.AGENT_TREASURIES,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['agentTreasuries'],
    }),
    updateAgentTreasury: builder.mutation({
      query: ({ treasuryId, form }) => ({
        url: `${apiEndpoints.AGENT_TREASURIES}/${treasuryId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['agentTreasuries'],
    }),
    deleteAgentTreasury: builder.mutation({
      query: (treasuryId) => ({
        url: `${apiEndpoints.AGENT_TREASURIES}/${treasuryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['agentTreasuries'],
    }),
  }),
});

export const {
  useFindAllAgentTreasuryQuery,
  useCreateAgentTreasuryMutation,
  useUpdateAgentTreasuryMutation,
  useDeleteAgentTreasuryMutation,
} = agentTreasuryApiSlice;
