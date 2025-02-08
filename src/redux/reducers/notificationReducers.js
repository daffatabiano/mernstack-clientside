import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  type: null,
  message: '',
  description: '',
};

const notificationReducers = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.visible = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.description = action.payload.description;
    },
    clearNotification: (state) => {
      state.visible = false;
      state.type = null;
      state.message = '';
      state.description = '';
    },
  },
});

export const { showNotification, clearNotification } =
  notificationReducers.actions;

export default notificationReducers.reducer;
