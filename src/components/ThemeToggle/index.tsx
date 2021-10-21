import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import { useIntl } from "react-intl";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "src/store/actions/app";
import { getTheme } from "src/store/selector/app";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useSelector(getTheme);

  const handleChangeTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip title={intl.formatMessage({ id: "toggleTheme" })} enterDelay={300}>
      <IconButton
        color="inherit"
        onClick={handleChangeTheme}
        data-testid="theme-toggle-button"
        data-ga-event-category="header"
        data-ga-event-action={theme}
      >
        {theme === "light" && <Brightness7Icon data-test-id="light" />}
        {theme === "dark" && <Brightness4Icon data-test-id="dark" />}
        {theme === "auto" && <BrightnessAutoIcon data-test-id="auto" />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
