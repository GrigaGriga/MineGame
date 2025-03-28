import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import type { IUserLoginData } from '@/entities/user/model';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/shared/lib/reduxHooks';
import { loginThunk } from '@/features/auth/lib/thunks';
import { loadAllThemesThunk } from '@/features/questionSlice/thunk';

export default function LoginForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: IUserLoginData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    dispatch(loginThunk(data)).then(() => {
          dispatch(loadAllThemesThunk())

      navigate('/');
    });
  };
  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
      py={5}
      onSubmit={loginHandler}
    >
      <TextField variant="outlined" name="email" label="Email" type="email" />
      <br />
      <TextField variant="outlined" name="password" label="Password" type="password" />
      <br />
      <Button variant="outlined" type="submit">
        Login
      </Button>
    </Box>
  );
}
