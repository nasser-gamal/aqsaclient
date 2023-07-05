import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  token: Cookies.get('token') ? JSON.parse(Cookies.get('token')) : null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set('user', JSON.stringify(action.payload.user));
      Cookies.set('token', JSON.stringify(action.payload.token));
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
      Cookies.set('user', null);
      Cookies.set('token', null);
    },
  },
});

export const { logOut, setCredentials } = userSlice.actions;
export default userSlice.reducer;
