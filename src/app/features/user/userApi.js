import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllUsers: builder.query({
      query: () => ({
        url: apiEndpoints.user.GET_USERS,
      }),
      providesTags: ['users'],
    }),
    createUser: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.user.CREATE_USER,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['users'],
    }),
    updateUser: builder.mutation({
      query: ({ userId, form }) => ({
        url: `${apiEndpoints.user.UPDATE_USER}/${userId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['users'],
    }),
    updatePassword: builder.mutation({
      query: ({ userId, password }) => ({
        url: `${apiEndpoints.user.UPDATE_PASSWORD}/${userId}`,
        method: 'PUT',
        body: password,
      }),
      invalidatesTags: ['users'],
    }),
    updateUserStatus: builder.mutation({
      query: (userId) => ({
        url: `${apiEndpoints.user.UPDATE_USER_STATUS}/${userId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['users'],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${apiEndpoints.user.DELETE_USER}/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
  }),
});

export const {
  useFindAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = userApiSlice;
