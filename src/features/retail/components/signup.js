import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerNewUserThunk } from "../slice";
import { v4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
}));

export function UserFormActions(props) {
  const classes = useStyles();
  const { handleSubmit } = props;
  return (
    <>
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
        Sign Up
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export function UserDetailForm(props) {
  const classes = useStyles();
  const { formdata, setFormdata } = props;

  const validations = (element) => {
    switch (element) {
      case "username": {
        return formdata.username.length < 5 ? true : false;
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
  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="Username"
            variant="outlined"
            required
            fullWidth
            id="Username"
            label="Username"
            autoFocus
            error={validations("username")}
            onChange={(e) => handleChange(e, "username")}
            value={formdata.username}
            helperText={
              validations("username") ? "Minimum character length is 5" : ""
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
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField
            onChange={(e) => handleChange(e, "password")}
            value={formdata.password}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue={formdata.gender}
            value={formdata.gender}
            onChange={(e) => handleChange(e, "gender")}
          >
            <FormControlLabel
              value="Male"
              control={<Radio color="primary" />}
              label="Male"
            />
            <FormControlLabel
              value="Female"
              control={<Radio color="primary" />}
              label="Female"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
            <Select
              native
              value={formdata.role}
              onChange={(e) => handleChange(e, "role")}
              label="role"
              inputProps={{
                name: "role",
                id: "outlined-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}
export default function RetailSignUp(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };
  const [formdata, setFormdata] = React.useState({
    username: "",
    email: "",
    age: 30,
    gender: "Male",
    role: "User",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      registerNewUserThunk({
        //string concanate - create user_id starting with username
        id: `${formdata.username}${v4()}`,
        ...formdata,
      })
    );
    history.replace(from);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="/eduonix-logo.png"></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      </div>
      <UserDetailForm formdata={formdata} setFormdata={setFormdata} />
      <UserFormActions handleSubmit={handleSubmit} />
    </Container>
  );
}
