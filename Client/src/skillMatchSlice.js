import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumeText: "",
  fileName: "",
  result: "", 
  isDarkMode: false,
  resumeLoading: false,
  geminiLoading: false,
  resumeError: false,
};

const skillMatchSlice = createSlice({
  name: "skillMatch",
  initialState,

  reducers: {
    setResumeText(state, action) {
      state.resumeText = action.payload;
    },
    setFileName(state, action) {
      state.fileName = action.payload;
    },
    setResult(state, action) {
      state.result = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setResumeLoading: (state, action) => {
      state.resumeLoading = action.payload; 
    },
    setGeminiLoading: (state, action) => {
      state.geminiLoading = action.payload; 
    },
    setResumeError: (state, action) => {
      state.resumeError = action.payload; 
    },
  },
});

export const { setResumeText, setFileName, setResult, toggleDarkMode, setResumeLoading, setGeminiLoading, setResumeError } = skillMatchSlice.actions;

export default skillMatchSlice.reducer;
