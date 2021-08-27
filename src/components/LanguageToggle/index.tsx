import React, { useState } from "react";
import { Tooltip, Button, Menu, MenuItem } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Translate";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";

import { LANGUAGES } from "src/constants";
import { setLocale } from "src/store/actions/app";
import { getLocale } from "src/store/selector/app";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    language: {
      margin: theme.spacing(0, 0.5, 0, 1),
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
  })
);

export default function LanguageToggle() {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();

  const locale = useSelector(getLocale);

  const [languageMenu, setLanguageMenu] = useState(null);

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
    <>
      <Tooltip
        title={intl.formatMessage({ id: "changeLanguage" })}
        enterDelay={300}
      >
        <Button
          id="switch-language"
          data-testid="switch-language"
          color="inherit"
          onClick={handleLanguageIconClick}
          data-ga-event-category="header"
          data-ga-event-action="language"
        >
          <LanguageIcon />
          <span
            id="selected-language"
            data-testid="selected-language"
            className={classes.language}
          >
            {LANGUAGES.find((language) => language.code === locale)?.text}
          </span>
          <ExpandMoreIcon fontSize="small" />
        </Button>
      </Tooltip>
      <Menu
        id="language-menu"
        data-testid="language-menu"
        anchorEl={languageMenu}
        open={Boolean(languageMenu)}
        onClose={handleLanguageMenuClose}
      >
        {LANGUAGES.map((language) => (
          <MenuItem
            id={`lang-item-${language.code}`}
            data-no-link="true"
            key={language.code}
            value={language.code}
            selected={locale === language.code}
            onClick={() => {
              handleLanguageMenuItemClick(language.code);
            }}
            lang={language.code}
          >
            {language.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
