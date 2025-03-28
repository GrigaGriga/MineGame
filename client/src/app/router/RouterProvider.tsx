import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../Layout/Layout';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { SignUpPage, LoginPage } from '@/pages';
import { MainPage } from '@/pages/MainPage/MainPage';
import { GamePage } from '@/pages/GamePage/GamePage';
import StatsPage from '@/pages/StatsPage/StatsPage';
import LKPage from '@/pages/LK/LKPage';
import ProtecteRouter from '@/shared/hoc/ProtecteRouter';
import { useAppSelector } from '@/shared/lib/reduxHooks';
import { AuthStatus } from '@/entities/user/model';

export default function RouterProvider(): React.JSX.Element {
  const status = useAppSelector((state) => state.auth.status);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={CLIENT_ROUTES.MAIN} element={<MainPage />} />
        <Route
          element={
            <ProtecteRouter
              isAllowed={status === AuthStatus.AUTHORIZED}
              redirectTo={CLIENT_ROUTES.LOGIN}
            />
          }
        >
          <Route path={CLIENT_ROUTES.GAME} element={<GamePage />} />
          <Route path={CLIENT_ROUTES.LK} element={<LKPage />} />
          <Route path={CLIENT_ROUTES.STATS} element={<StatsPage />} />
        </Route>
        <Route
          element={
            <ProtecteRouter
              isAllowed={status !== AuthStatus.AUTHORIZED}
              redirectTo={CLIENT_ROUTES.MAIN}
            />
          }
        >
          <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
          <Route path={CLIENT_ROUTES.LOGIN} element={<LoginPage />} />
        </Route>
        <Route path={CLIENT_ROUTES.NOT_FOUND} element={<h1>No content</h1>} />
      </Route>
    </Routes>
  );
}
