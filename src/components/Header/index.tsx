import React, {useState} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Tooltip,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { toggleTheme, setLocale } from '../../store/actions';
import { IAppState } from '../../store/reducers';
import { LANGUAGES, GITHUB_REPO } from '../../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    language: {
      margin: theme.spacing(0, 0.5, 0, 1),
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      marginRight: theme.spacing(1),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);

export default function SearchAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const intl = useIntl();

  const themeType = useSelector((state: IAppState) => state.theme);
  const locale = useSelector((state: IAppState) => state.locale);

  const [languageMenu, setLanguageMenu] = useState(null);

  const appBarColor = themeType === 'dark' ? 'transparent' : undefined;

  const handleChangeTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLanguageIconClick = (event: any) => {
    setLanguageMenu(event.currentTarget);
  };
  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  const handleLanguageMenuItemClick = (code: string) => {
    dispatch(setLocale(code));
    handleLanguageMenuClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color={appBarColor}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Transmission
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={intl.formatMessage({ id: 'search' })}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Tooltip title={intl.formatMessage({ id: 'changeLanguage' })} enterDelay={300}>
            <Button
              color="inherit"
              onClick={handleLanguageIconClick}
              data-ga-event-category="header"
              data-ga-event-action="language"
            >
              <LanguageIcon />
              <span className={classes.language}>{LANGUAGES.find(language=>language.code === locale)?.text}</span>
              <ExpandMoreIcon fontSize="small" />
            </Button>
          </Tooltip>
          <Tooltip title={intl.formatMessage({ id: 'toggleTheme' })} enterDelay={300}>
            <IconButton
              color="inherit"
              onClick={handleChangeTheme}
              data-ga-event-category="header"
              data-ga-event-action="dark"
            >
              {theme.palette.type === 'light' ? (
                <Brightness4Icon />
              ) : (
                <Brightness7Icon />
              )}
            </IconButton>
          </Tooltip>
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
          <Menu
            id="language-menu"
            anchorEl={languageMenu}
            open={Boolean(languageMenu)}
            onClose={handleLanguageMenuClose}
          >
            {LANGUAGES.map((language) => (
              <MenuItem
                data-no-link="true"
                key={language.code}
                value={language.code}
                selected={locale === language.code}
                onClick={()=>{handleLanguageMenuItemClick(language.code)}}
                lang={language.code}
              >
                {language.text}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}