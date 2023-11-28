import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const agentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllAgents: builder.query({
      query: () => ({
        url: `${apiEndpoints.USERS}?roleId=3`,
      }),
      providesTags: ['agents'],
    }),
    createAgent: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.USERS,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['agents'],
    }),
    updateAgent: builder.mutation({
      query: ({ agentId, form }) => ({
        url: `${apiEndpoints.USERS}/${agentId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['agents'],
    }),
    updatePasswordManual: builder.mutation({
      query: ({ userId, password }) => ({
        url: `${apiEndpoints.USERS}/${userId}`,
        method: 'PUT',
        body: { password },
      }),
      invalidatesTags: ['users'],
    }),
    updateAgentPassword: builder.mutation({
      query: ({ agentId, password }) => ({
        url: `${apiEndpoints.USERS}/${agentId}`,
        method: 'PUT',
        body: { password },
      }),
      invalidatesTags: ['agents'],
    }),
    updateAgentStatus: builder.mutation({
      query: (agentId) => ({
        url: `${apiEndpoints.USERS}/${agentId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['agents'],
    }),
    deleteAgent: builder.mutation({
      query: (agentId) => ({
        url: `${apiEndpoints.USERS}/${agentId}`,
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
