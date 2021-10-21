import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Tooltip,
  IconButton,
  Hidden,
} from "@mui/material";
import { alpha, Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";

import { toggleMenuOpen } from "src/store/actions/menu";
import { GITHUB_REPO } from "src/constants";
import ThemeToggle from "src/components/ThemeToggle";
import SettingsButton from "src/components/SettingsButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: 1201,
      backgroundColor:
        theme.palette.mode === "dark" ? "transparent" : undefined,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    language: {
      margin: theme.spacing(0, 0.5, 0, 1),
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      marginRight: theme.spacing(1),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

export default function SearchAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleMenuClick = () => {
    dispatch(toggleMenuOpen());
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Transmission Client
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={intl.formatMessage({ id: "search" })}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <ThemeToggle />
          <SettingsButton />
          <Hidden xsDown>
            <Tooltip title="Github" enterDelay={300}>
              <IconButton
                component="a"
                color="inherit"
                href={GITHUB_REPO}
                target="_blank"
                data-ga-event-category="header"
                data-ga-event-action="github"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
