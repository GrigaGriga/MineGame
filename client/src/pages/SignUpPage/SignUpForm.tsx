import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { IUserSignUpData } from '@/entities/user/model';
import { signupThunk } from '@/features/auth/lib/thunks';
import { useAppDispatch } from '@/shared/lib/reduxHooks';
import { loadAllThemesThunk } from '@/features/questionSlice/thunk';

export default function SignUpForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: IUserSignUpData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    void dispatch(signupThunk(data)).then(() => {
      dispatch(loadAllThemesThunk());
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
      onSubmit={submitHandler}
    >
      <TextField variant="outlined" name="name" label="Name" />
      <br />
      <TextField variant="outlined" name="email" label="Email" type="email" />
      <br />
      <TextField variant="outlined" name="password" label="Password" type="password" />
      <br />
      <Button variant="outlined" type="submit">
        Sign Up
      </Button>
    </Box>
  );
}
