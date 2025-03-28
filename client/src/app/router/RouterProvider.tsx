import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../Layout/Layout';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { SignUpPage, LoginPage } from '@/pages';
import { MainPage } from '@/pages/MainPage/MainPage';
import { AddBookPage } from '@/pages/AddBookPage/AddBookPage';
import { GamePage } from '@/pages/GamePage/GamePage';
import StatsPage from '@/pages/StatsPage/StatsPage';
import LKPage from '@/pages/LK/LKPage';


export default function RouterProvider(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={CLIENT_ROUTES.MAIN} element={<MainPage />} />
        <Route path={CLIENT_ROUTES.GAME} element={<GamePage />} />
        <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path={CLIENT_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={CLIENT_ROUTES.STATS} element={<StatsPage />} />
        <Route path={CLIENT_ROUTES.LK} element={<LKPage />} />
        <Route path={CLIENT_ROUTES.NOT_FOUND} element={<h1>No content</h1>} />
      </Route>
    </Routes>
  );
}
