import { createAction } from '@reduxjs/toolkit';

export const openModal = createAction('OPEN_MODAL');
export const closeModal = createAction('CLOSE_MODAL');
export const deleteChannel = createAction('DELETE_CHANNEL');
export const startProccessing = createAction('START_PROCCESIING');
export const finishProccessing = createAction('FINISH_PROCCESIING');
