import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";
import { AuthStatus } from "@/entities/user/model";
import { logoutThunk } from "@/features/auth/lib/thunks";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import "./NavBarStyles.css";

export default function NavBar(): React.JSX.Element {
  const status = useAppSelector((store) => store.auth.status);
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();
  // console.log(user)

  const logoutHandler = async (): Promise<void> => {
    dispatch(logoutThunk());
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink to="/" className="nav-link">
            {status === AuthStatus.AUTHORIZED ? `Welcome, ${user?.name}` : "Guest"}
          </NavLink>
        </div>

        <div className="navbar-links">
          <NavLink to={CLIENT_ROUTES.MAIN} className="nav-link">
            ГЛАВНАЯ
          </NavLink>
          
          {user && (
            <>
              <NavLink to={CLIENT_ROUTES.GAME} className="nav-link">
                ИГРА
              </NavLink>
              <NavLink to={CLIENT_ROUTES.LK} className="nav-link">
                МОЙ ПРОФИЛЬ
              </NavLink>
              <NavLink to={CLIENT_ROUTES.STATS} className="nav-link">
                СТАТИСТИКА
              </NavLink>
            </>
          )}
        </div>

        <div className="navbar-auth">
          {!user && (
            <>
              <NavLink to={CLIENT_ROUTES.SIGN_UP} className="nav-link">
                ЗАРЕГИСТРИРОВАТЬСЯ
              </NavLink>
              <NavLink to={CLIENT_ROUTES.LOGIN} className="nav-link">
                ВОЙТИ
              </NavLink>
            </>
          )}
          {user && (
            <button onClick={logoutHandler} className="logout-button">
              ВЫЙТИ
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}