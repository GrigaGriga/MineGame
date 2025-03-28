import { IQuestion } from '@/entities/question/model';
import { createSlice } from '@reduxjs/toolkit';
import { loadAllThemesThunk } from './thunk';

export type QuestionState = {
  themes: IQuestion[];
  score: number;
  // isLoadingBooks: boolean;
};

const initialState: QuestionState = {
  themes: [],
  score: 0,
  // isLoadingBooks: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllThemesThunk.fulfilled, (state, action) => {
        state.themes = action.payload;
        // state.isLoadingBooks = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { incrementScore, decrementScore } = questionSlice.actions;

export default questionSlice.reducer;
