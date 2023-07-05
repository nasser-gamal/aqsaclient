import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
  listId: null,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isOpen = !state.isOpen;
    },
    OpenSideBar: (state) => {
      state.isOpen = true;
    },
    CloseSideBar: (state) => {
      state.isOpen = false;
    },
    toggleListMenu: (state, action) => {
      state.listId = action.payload.listId;
    },
  },
});

export const { toggleSideBar, OpenSideBar, CloseSideBar, toggleListMenu } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
