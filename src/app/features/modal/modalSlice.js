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
    updateFormState: (state, action) => {
      // Update the form state with the payload data
      state.childrenProps = action.payload;
    },
  },
});

export const { openModal, closeModal, updateFormState } = modalSlice.actions;
export default modalSlice.reducer;
