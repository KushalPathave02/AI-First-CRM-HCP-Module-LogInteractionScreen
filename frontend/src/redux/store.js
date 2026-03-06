import { configureStore, createSlice } from '@reduxjs/toolkit';

const interactionSlice = createSlice({
  name: 'interaction',
  initialState: {
    formData: {
      hcp_name: '',
      interaction_type: 'Meeting',
      date: '',
      time: '',
      topics_discussed: '',
      sentiment: 'Neutral',
      outcome: '',
      follow_up: '',
      materials_shared: [],
    },
    chatHistory: [],
    loading: false,
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    updateFullForm: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    addChatMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { updateField, updateFullForm, addChatMessage, setLoading } = interactionSlice.actions;

export const store = configureStore({
  reducer: {
    interaction: interactionSlice.reducer
  }
});
