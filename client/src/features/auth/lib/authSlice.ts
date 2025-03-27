import { AuthSliceT, AuthStatus } from '@/entities/user/model';
import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, refreshThunk, signupThunk } from './thunks';

const initialState: AuthSliceT = {
  status: AuthStatus.PENDING,
  user: null
  // buttonLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthSliceT,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(loginThunk.pending, (_) => {
        // state.buttonLoading = true;
      // })
      .addCase(loginThunk.fulfilled, (state, action) => {
        // buttonLoading: false,
        state.status = AuthStatus.AUTHORIZED;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state) => {
        // state.buttonLoading = false;
        state.status = AuthStatus.GUEST;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        // buttonLoading: false,
        state.status = AuthStatus.AUTHORIZED;
        state.user = action.payload.user;
      })
      .addCase(signupThunk.rejected, (state) => {
        // state.buttonLoading = false;
        state.status = AuthStatus.GUEST;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.status = AuthStatus.PENDING;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        // buttonLoading: false,
        state.status = AuthStatus.AUTHORIZED;
        state.user = action.payload.user;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.status = AuthStatus.GUEST;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.status= AuthStatus.GUEST;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status= AuthStatus.GUEST;
        state.user = null;
      })
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default authSlice.reducer;
