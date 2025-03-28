import QuestionApi from '@/entities/question/api/QuestionApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadAllThemesThunk = createAsyncThunk('questions/loadAllThemesThunk', () =>
  QuestionApi.getThemes(),
);

export const addStatOfUserThunk = createAsyncThunk(
  'questions/addStatOfUserThunk',
  async (score: number) => {
    // console.log(score)
    return QuestionApi.addStatOfUser(score);
  },
);