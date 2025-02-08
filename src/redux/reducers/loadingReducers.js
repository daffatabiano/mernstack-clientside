import { createSlice } from '@reduxjs/toolkit';

const loadingReducers = createSlice({
  name: 'loading',
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingReducers.actions;
export default loadingReducers.reducer;
