import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
 
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      Cookies.set('user', JSON.stringify(action.payload.user));
      
    },

    logOut: (state) => {
      state.user = null;
      Cookies.set('user', null);
    },
  },
});

export const { logOut, setCredentials } = userSlice.actions;
export default userSlice.reducer;
