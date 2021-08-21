import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Avatar, Button, CssBaseline, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { newBookingThunk, selectUserInfo } from "../slice";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function NewBooking(props) {
  const { handleClose } = props; //props

  const classes = useStyles();

  const dispatch = useDispatch();

  const userInfo = useSelector(selectUserInfo);

  const [formdata, setFormdata] = React.useState({
    name: "",
    email: "",
    age: 30,
    hospital: "CARE HOSPITAL",
    vaccine: "Covaxin",
    mobile: "",
    appointmenttime: new Date(),
  });

  const validations = (element) => {
    switch (element) {
      case "name": {
        return formdata.name.length < 6 ? true : false;
      }
      default: {
        return false;
      }
    }
  };

  const handleChange = (e, element) => {
    setFormdata({
      ...formdata,
      [element]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const newFormdata = {
      ...formdata,
      //string concanate create user_id starting with username
      user_id: userInfo.id,
      bookingtime: new Date(),
      status: "booked",
    };
    dispatch(newBookingThunk(newFormdata));
    handleClose();
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="/eduonix-logo.png"></Avatar>
        <Typography component="h1" variant="h5">
          Book Appointment
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                error={validations("name")}
                onChange={(e) => handleChange(e, "name")}
                value={formdata.name}
                helperText={
                  validations("name") ? "Minimum character length is 6" : ""
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => handleChange(e, "age")}
                value={formdata.age}
                variant="outlined"
                required
                fullWidth
                id="Age"
                label="Age"
                name="Age"
                autoComplete="lname"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                error={validations("email")}
                onChange={(e) => handleChange(e, "email")}
                value={formdata.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={validations("email") ? "Enter a Valid Email" : ""}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => handleChange(e, "mobile")}
                value={formdata.mobile}
                variant="outlined"
                required
                fullWidth
                name="mobile"
                label="Mobile"
                type="mobile"
                id="mobile"
                autoComplete="current-mobile"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="datetime-local"
                label="Appointment Time"
                type="datetime-local"
                fullWidth
                value={formdata.appointmenttime}
                onChange={(e) => {
                  setFormdata({
                    ...formdata,
                    appointmenttime: e.target.value,
                  });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  hospital
                </InputLabel>
                <Select
                  native
                  value={formdata.hospital}
                  onChange={(e) => handleChange(e, "hospital")}
                  label="Hospital"
                  inputProps={{
                    name: "Hospital",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="APOLLO HEALTH CARE">APOLLO HEALTH CARE</option>
                  <option value="CARE HOSPITAL">CARE HOSPITAL</option>
                  <option value="GANDHI HOSPITAL">GANDHI HOSPITAL</option>
                  <option value="TIMS GACHIBOWL">TIMS GACHIBOWLI</option>
                  <option value="DISTRICT HOSPITAL, KING KOTI">
                    DISTRICT HOSPITAL, KING KOTI
                  </option>
                  <option value="FEVER HOSPITAL">FEVER HOSPITAL</option>
                  <option value="CHEST HOSPITAL">CHEST HOSPITAL</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  vaccine
                </InputLabel>
                <Select
                  native
                  value={formdata.vaccine}
                  onChange={(e) => handleChange(e, "vaccine")}
                  label="Vaccine Type"
                  inputProps={{
                    name: "vaccine",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="Covaxin">Covaxin</option>
                  <option value="Covishield">Covishield</option>
                </Select>
              </FormControl>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </div>
    </Grid>
  );
}
