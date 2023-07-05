import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalTitle: null,
  isOpen: false,
  componentName: null,
  childrenProps: null,
  status: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalTitle = action.payload.modalTitle;
      state.componentName = action.payload.name;
      state.childrenProps = action.payload.childrenProps;
      state.status = action.payload.status;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalTitle = null;
      state.componentName = null;
      state.childrenProps = null;
      state.status = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
