import StatApi from '../../entities/stat/api/StatApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadStatThunk = createAsyncThunk('stat/loadStatThunk',  () =>{
    return StatApi.getAllStat()}   
);