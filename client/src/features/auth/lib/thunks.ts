import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserApi } from '@/entities/user/api/UserApi';
import { IUserLoginData, IUserSignUpData } from '@/entities/user/model';
import { setAccessToken } from '@/shared/lib/axiosInstance';

export const loginThunk = createAsyncThunk('auth/loginThunk', async (formData: IUserLoginData ) => {
  const res = await UserApi.login(formData);
  setAccessToken(res.data.accessToken)
  return res.data
});

export const signupThunk = createAsyncThunk('auth/signupThunk', async (formData: IUserSignUpData ) => {
  const res = await UserApi.signup(formData);
  setAccessToken(res.data.accessToken)
  return res.data
});

export const refreshThunk = createAsyncThunk('auth/refreshThunk', async () =>{
  const res = await UserApi.refreshTokens();
setAccessToken(res.data.accessToken)
return res.data
});

export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () =>
  UserApi.logout(),
);
