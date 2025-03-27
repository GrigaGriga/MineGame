import { refreshThunk } from '@/features/auth/lib/thunks';
import {
  loadAllBooksThunk,
  loadFavouriteBooksThunk,
  loadUserBooksThunk,
} from '@/features/bookSlice/thunk';
import { useAppDispatch } from '@/shared/lib/reduxHooks';
import Footer from '@/widgets/Footer.tsx/Footer';
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
    dispatch(loadAllBooksThunk());
    dispatch(loadUserBooksThunk());
    dispatch(loadFavouriteBooksThunk());
  }, []);

  return (
    <>
      <Container>
        <NavBar />
        <Outlet />
        <Footer />
      </Container>
    </>
  );
}
