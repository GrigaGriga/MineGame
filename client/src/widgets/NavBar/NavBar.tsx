import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router";
import UserCard from "@/entities/user/ui/UserCard";
import { useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";
import { AuthStatus } from "@/entities/user/model";
import { logoutThunk } from "@/features/auth/lib/thunks";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";

const styles = {
  navLink: {
    color: "white",
    marginRight: "20px",
    textDecoration: "none",
  },
};

export default function NavBar(): React.JSX.Element {
  const status = useAppSelector((store) => store.auth.status);
  const user = useAppSelector((store) => store.auth.user);
    const dispatch = useAppDispatch();
  // console.log(user)

  const logoutHandler = async (): Promise<void> => {
    dispatch(logoutThunk());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={styles.navLink}>
              {status===AuthStatus.AUTHORIZED ? `Welcome, ${user?.name}` : "Guest"}
            </NavLink>
            <NavLink to={CLIENT_ROUTES.MAIN} style={styles.navLink}>
              Main
            </NavLink>
            <NavLink to={CLIENT_ROUTES.USER} style={styles.navLink}>
             user
            </NavLink>
            <NavLink to={CLIENT_ROUTES.GAME} style={styles.navLink}>
             game
            </NavLink>
            <NavLink to={CLIENT_ROUTES.STATS} style={styles.navLink}>
             stats
            </NavLink>
            {user && (<>
            <NavLink to={CLIENT_ROUTES.BOOKS} style={styles.navLink}>
              Books
            </NavLink>
            <NavLink to={CLIENT_ROUTES.ADDBOOK} style={styles.navLink}>
              AddBook
            </NavLink>
            </>)}
            {!user && (
              <>
                <NavLink to={CLIENT_ROUTES.SIGN_UP} style={styles.navLink}>
                  SignUp
                </NavLink>
                <NavLink to={CLIENT_ROUTES.LOGIN} style={styles.navLink}>
                  Login
                </NavLink>
              </>
            )}
          </Typography>
          <UserCard />
          {user && (
            <Button color="inherit" 
            onClick={logoutHandler}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
