import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const agentTreasuryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllAgentTreasury: builder.query({
      query: () => ({
        url: apiEndpoints.agentTreasury.GET_AGENT_TREASURYS,
      }),
      providesTags: ['agentTreasury'],
    }),
    createAgentTreasury: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.agentTreasury.CREATE_AGENT_TREASURY,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['agentTreasury'],
    }),
    updateAgentTreasury: builder.mutation({
      query: ({ treasuryId, form }) => ({
        url: `${apiEndpoints.agentTreasury.UPDATE_AGENT_TREASURY}/${treasuryId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['agentTreasury'],
    }),
    deleteAgentTreasury: builder.mutation({
      query: (treasuryId) => ({
        url: `${apiEndpoints.agentTreasury.DELETE_AGENT_TREASURY}/${treasuryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['agentTreasury'],
    }),
  }),
});

export const {
  useFindAllAgentTreasuryQuery,
  useCreateAgentTreasuryMutation,
  useUpdateAgentTreasuryMutation,
  useDeleteAgentTreasuryMutation,
} = agentTreasuryApiSlice;
