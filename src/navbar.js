import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { GitHub, Twitter } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserActivity } from "./features/retail/slice";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 180,
  },
  info: {
    "text-align": "center",
    "font-weight": "bold",
  },
  appBar: {
    background: "#fcb752",
    color: "#ffffff",
  },
}));

const NavDrawer = (props) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      open={props.drawerOpened}
      onClose={props.toggleDrawer(false)}
    >
      <div
        className={classes.list}
        onClick={props.toggleDrawer(false)}
        onKeyDown={props.toggleDrawer(false)}
      >
        <List>
          <ListItem className={classes.info}>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component="a" href="https://github.com/vasu2652">
            <ListItemIcon>
              <GitHub />
            </ListItemIcon>
            <ListItemText primary="GitHub" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component="a" href="https://github.com/vasu2652">
            <ListItemIcon>
              <Twitter />
            </ListItemIcon>
            <ListItemText primary="Twitter" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

const NavBar = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const dispatch = useDispatch();
  const userActivity = useSelector(selectUserActivity);
  //const adminActivity = useSelector(selectAdminActivity);
  const classes = useStyles();

  const toggleDrawer = (booleanValue) => () => {
    setDrawerOpened(booleanValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {/* this is menu button*/}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <Menu />
          </IconButton>

          {/* this is header content */}
          <Typography variant="h6" className={classes.title}>
            Vaccine Booking System
          </Typography>

          <Button
            color="inherit"
            onClick={() => {
              if (userActivity.loggedIn) dispatch(logout());
              // if (adminActivity.adminLoggedIn)
              //   dispatch(adminLogout());
            }}
          >
            {/* time for admin login 1:05:27 */}
            {userActivity.loggedIn ? "logout" : "login"}
          </Button>
        </Toolbar>
      </AppBar>
      <NavDrawer drawerOpened={drawerOpened} toggleDrawer={toggleDrawer} />
    </div>
  );
};
export default NavBar;
