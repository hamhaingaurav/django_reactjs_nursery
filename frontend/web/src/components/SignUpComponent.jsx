import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import SignInImage from "../assets/img/signin.jpg";
import { signUp } from "../store/actions/auth";
import { routes } from "../Routes";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${SignInImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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

const initialCredentials = {
  is_nursery: false,
  email: null,
  password1: null,
  password2: null,
};

function SignUpComponent(props) {
  const classes = useStyles();

  const history = useHistory();

  const { isAuthenticated, isUiLoading, signUp } = props;

  const [crendentials, setCrendentials] = React.useState(initialCredentials);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // submit the form
    const { email, password1, password2 } = crendentials;
    if (email && password1 && password1 === password2) {
      signUp(crendentials);
    }
  };

  const handleInputChange = (e) => {
    // Set the values into current state
    setCrendentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setCrendentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleRouteClick = (route) => {
    history.push(route);
  };

  return (
    <>
      {isAuthenticated && <Redirect to="/" />}
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} md={7} className={classes.image} />
        <Grid item xs={12} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleFormSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    required
                    fullWidth
                    name="password1"
                    label="Password"
                    type="password"
                    id="password1"
                    autoComplete="current-password"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    required
                    fullWidth
                    name="password2"
                    label="Retype Password"
                    type="password"
                    id="password2"
                    autoComplete="current-password"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        name="is_nursery"
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="I want to register as a Nursery accout."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                disabled={isUiLoading}
                className={classes.submit}
                endIcon={isUiLoading && <CircularProgress size={20} />}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    onClick={() => handleRouteClick(routes.signin)}
                    variant="body2"
                    component="button"
                    color="secondary"
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

SignUpComponent.propTypes = {
  signUp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isUiLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isUiLoading: state.ui.isUiLoading,
});

export default connect(mapStateToProps, { signUp })(SignUpComponent);
