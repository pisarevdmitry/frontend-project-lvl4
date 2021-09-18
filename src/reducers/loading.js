import { createSlice } from '@reduxjs/toolkit';
import { loadData } from '../actions';

const loadingSlice = createSlice({
  name: 'loadingInfo',
  initialState: { loaded: false },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(loadData.fulfilled, (state) => {
      state.loaded = true;
    });
  },
});

export default loadingSlice.reducer;
