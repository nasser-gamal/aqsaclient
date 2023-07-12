import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const agentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllAgents: builder.query({
      query: () => ({
        url: apiEndpoints.agent.GET_AGENTS,
      }),
      providesTags: ['agents'],
    }),
    createAgent: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.agent.CREATE_AGENT,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['agents'],
    }),
    updateAgent: builder.mutation({
      query: ({ agentId, form }) => ({
        url: `${apiEndpoints.agent.UPDATE_AGENT}/${agentId}`,
        method: 'PATCH',
        body: form,
      }),
      invalidatesTags: ['agents'],
    }),
    updateAgentPassword: builder.mutation({
      query: ({ agentId, password }) => ({
        url: `${apiEndpoints.agent.UPDATE_AGENT_PASSWORD}/${agentId}`,
        method: 'PATCH',
        body: { password },
      }),
      invalidatesTags: ['agents'],
    }),
    updateAgentStatus: builder.mutation({
      query: (agentId) => ({
        url: `${apiEndpoints.agent.UPDATE_AGENT_STATUS}/${agentId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['agents'],
    }),
    deleteAgent: builder.mutation({
      query: (agentId) => ({
        url: `${apiEndpoints.agent.DELETE_AGENT}/${agentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['agents'],
    }),
  }),
});

export const {
  useFindAllAgentsQuery,
  useCreateAgentMutation,
  useUpdateAgentMutation,
  useUpdateAgentPasswordMutation,
  useUpdateAgentStatusMutation,
  useDeleteAgentMutation,
} = agentApiSlice;
