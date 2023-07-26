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
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['agents'],
    }),
    updatePasswordManual: builder.mutation({
      query: ({ userId, password }) => ({
        url: `${apiEndpoints.user.UPDATE_AGENT_PASSWORD_MANUAL}/${userId}`,
        method: 'PUT',
        body: { password },
      }),
      invalidatesTags: ['users'],
    }),
    updateAgentPassword: builder.mutation({
      query: ({ agentId, password }) => ({
        url: `${apiEndpoints.agent.UPDATE_AGENT_PASSWORD}/${agentId}`,
        method: 'PUT',
        body: { password },
      }),
      invalidatesTags: ['agents'],
    }),
    updateAgentStatus: builder.mutation({
      query: (agentId) => ({
        url: `${apiEndpoints.agent.UPDATE_AGENT_STATUS}/${agentId}`,
        method: 'PUT',
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
  useUpdatePasswordManualMutation,
  useUpdateAgentStatusMutation,
  useDeleteAgentMutation,
} = agentApiSlice;
