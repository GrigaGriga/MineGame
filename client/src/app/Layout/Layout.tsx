import { refreshThunk } from '@/features/auth/lib/thunks';
import {  loadAllQuestionsThunk, loadAllThemesThunk} from '@/features/questionSlice/thunk';
import { useAppDispatch } from '@/shared/lib/reduxHooks';
import NavBar from '@/widgets/NavBar/NavBar';
import { Container } from '@mui/material';
import React, { useEffect } from 'react';

import { Outlet } from 'react-router';

export default function Layout(): React.JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshThunk());
  }, []);

  useEffect(() => {
    dispatch(loadAllQuestionsThunk());
    dispatch(loadAllThemesThunk());
  }, []);

  return (
    <>
      <Container>
        <NavBar />
        <Outlet />
      </Container>
    </>
  );
}
