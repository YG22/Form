import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
const axios = require("axios").default;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/YG22">
        YG22
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [data, setData] = useState({});
  // const [input , setInput] =useState("");
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur" //best option
  });
  function handleChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  }
  // alert(JSON.stringify(data))
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit((event) =>
            axios
              .post("https://simple-node-post.herokuapp.com/", {
                name: data
              })
              .then(function (response) {
                setData({ ...data, [event.target.name]: event.target.value });
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error);
              })
          )}
        >
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: "You must provide the email address!",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "You must provide a valid email address!"
              }
            })}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {errors.email && <div>{errors.email.message}</div>}
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: "You must provide a password.",
              minLength: {
                value: 6,
                message: "Your password must be greater than 6 characters"
              }
            })}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {errors.password && <div>{errors.password.message}</div>}
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: "You must provide a name.",
              maxLength: {
                value: 12,
                message: "Your name must be up to 12 characters long."
              }
            })}
            required
            fullWidth
            name="name"
            label="Name"
            type="name"
            id="name"
            autoComplete="current-name"
          />
          {errors.name && <div>{errors.name.message}</div>}
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: "You must satisfy your age!",
              pattern: {
                value: /^(?:1[01][0-9]|120|1[6-9]|[2-9][0-9])$/,
                message: "You must provide legal age!"
              }
            })}
            required
            fullWidth
            id="age"
            label="Age"
            name="age"
            // autoComplete="age"
            autoFocus
          />
          {errors.age && <div>{errors.age.message}</div>}
          <h1>What is your favorite animal?</h1>
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: "",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Enter only letters!"
              }
            })}
            required
            fullWidth
            id="animal"
            label="Enter animal"
            name="animal"
            autoComplete="age"
            autoFocus
          />
          {errors.animal && <div>{errors.animal.message}</div>}
          <FormControlLabel
            control={
              <Checkbox
                inputRef={register}
                color="primary"
                defaultValue={false}
                name="remember"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
