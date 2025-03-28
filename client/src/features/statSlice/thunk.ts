import StatApi from '../../entities/stat/api/StatApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IStat } from '../../entities/stat/model';

export const loadStatThunk = createAsyncThunk('stat/loadStatThunk', () =>
    StatApi.getAllStat(),   
);