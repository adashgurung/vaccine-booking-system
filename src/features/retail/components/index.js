import React from "react";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import UpdateIcon from "@material-ui/icons/Update";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import GenericModal from "./modal";
import ViewBookings from "./view-bookings";
import NewBooking from "./new-booking";
import UpdateProfile from "./update-profile";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../slice";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function RetailIndex() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const userInfo = useSelector(selectUserInfo);
  const [selected, setSelected] = React.useState("new_booking");
  const changeSelectedView = (view) => {
    setSelected(view);
    setOpen(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Hi {userInfo?.username}, Bookings
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Quickly check you existing bookings, Book Appointment for your
          Vaccination, Update your profile.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} justifyContent="space-evenly">
          <Fab
            onClick={() => changeSelectedView("new_booking")}
            color="primary"
            variant="extended"
            aria-label="Add"
            className={classes.fab}
          >
            <AddIcon className={classes.extendedIcon} /> New Booking
          </Fab>
          <Fab
            onClick={() => changeSelectedView("view_bookings")}
            color="secondary"
            variant="extended"
            aria-label="view"
            className={classes.fab}
          >
            <VisibilityIcon className={classes.extendedIcon} /> View Bookings
          </Fab>
          <Fab
            onClick={() => changeSelectedView("update_profile")}
            color="primary"
            variant="extended"
            aria-label="update"
            className={classes.fab}
          >
            <UpdateIcon className={classes.extendedIcon} /> Update Profile
          </Fab>
        </Grid>
      </Container>
      <GenericModal
        render={() => {
          switch (selected) {
            case "new_booking":
              return <NewBooking handleClose={handleClose} />;
            case "view_booking":
              return <ViewBookings />;
            case "update_profile":
              return <UpdateProfile />;
            default:
              return <ViewBookings />;
          }
        }}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </React.Fragment>
  );
}
