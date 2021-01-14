/* eslint-disable implicit-arrow-linebreak */
import React from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import {
  Theme,
  withStyles,
  createStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { useIntl } from "react-intl";

import { LANGUAGES } from "../../constants";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/random)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.grey[900]
          : theme.palette.grey[50],
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
      marginTop: theme.spacing(1),
    },
    langBox: {
      display: "flex",
      justifyContent: "space-between",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });
interface Props extends WithStyles<typeof styles> {
  locale: string;
  setLocale: (locale: string) => void;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/zj9495/transmission-webui">
        Transmission Webui
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function SignIn(props: Props) {
  const { classes, locale } = props;
  const intl = useIntl();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.setLocale(event.target.value as string);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {intl.formatMessage({ id: "signIn" })}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label={intl.formatMessage({ id: "userName" })}
              name="userName"
              autoComplete="userName"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={intl.formatMessage({ id: "password" })}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box className={classes.langBox}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={intl.formatMessage({ id: "rememberMe" })}
              />
              <FormControl>
                <Select value={locale} onChange={handleChange}>
                  {LANGUAGES.map((language) => (
                    <MenuItem key={language.code} value={language.code}>
                      {language.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {intl.formatMessage({ id: "SIGNIN" })}
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SignIn);
