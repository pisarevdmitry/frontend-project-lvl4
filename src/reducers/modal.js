import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extraData: null,
};

const modalSlice = createSlice({
  name: 'modalInfo',
  initialState,
  reducers: {
    openModal: (_state, { payload }) => (
      { isOpened: true, type: payload.type, extraData: payload.extra || null }
    ),
    closeModal: () => (
      { isOpened: false, type: null, extraData: null }
    ),
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
