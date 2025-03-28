import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IStat, IUserWithStats } from "../../entities/stat/model";
import { loadStatThunk } from "./thunk";

export type StatStatse = {
    stat: IUserWithStats[];
    isLoading: boolean;
    error: string;
};

const initialState: StatStatse = {
    stat: [],
    isLoading: false,
    error: "",
};

export type StatActionTypes = 
{ type: 'SET_STAT'; payload: IStat[] }

export const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadStatThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadStatThunk.fulfilled, (state, action: PayloadAction<IUserWithStats[]>) => {
                state.isLoading = false;
                state.stat = action.payload;
            })
            .addCase(loadStatThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default statSlice.reducer;