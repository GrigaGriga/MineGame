import { ITheme } from '@/entities/question/model';
import { createSlice } from '@reduxjs/toolkit';
import { loadAllThemesThunk } from './thunk';

export type QuestionState = {
  themes: ITheme[];
  score: number;
};

const initialState: QuestionState = {
  themes: [],
  score: 0,
};

export const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    incrementScore: (state, action) => {
      state.score = state.score + action.payload.point;
      state.themes = state.themes.map((theme) => {
        if (theme.id === action.payload.themeId) {
          return {
            ...theme,
            Questions: theme.Questions.map((question) =>
              question.id === action.payload.id ? { ...question, isSolved: true } : question,
            ),
          };
        }
        return theme;
      });
    },
    decrementScore: (state, action) => {
      state.score = state.score - action.payload.point;
      state.themes = state.themes.map((theme) => {
        if (theme.id === action.payload.themeId) {
          return {
            ...theme,
            Questions: theme.Questions.map((question) =>
              question.id === action.payload.id ? { ...question, isSolved: true } : question,
            ),
          };
        }
        return theme;
      });
    },

    resetScore: (state) => {
      state.score = 0
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllThemesThunk.fulfilled, (state, action) => {
        state.themes = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { incrementScore, decrementScore, resetScore } = questionSlice.actions;

export default questionSlice.reducer;
