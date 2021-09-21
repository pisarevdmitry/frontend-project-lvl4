import { createReducer } from '@reduxjs/toolkit';
import { openModal, closeModal } from '../actions/index.js';

const initialState = {
  isOpened: false,
  type: null,
  extraData: null,
};

const modalReducer = createReducer(initialState, (builder) => {
  builder.addCase(openModal, (_state, { payload }) => (
    { isOpened: true, type: payload.type, extraData: payload.extra || null }
  ));
  builder.addCase(closeModal, () => (
    { isOpened: false, type: null, extraData: null }
  ));
});

export default modalReducer;
