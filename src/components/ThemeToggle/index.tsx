import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { useIntl } from "react-intl";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import BrightnessAutoIcon from "@material-ui/icons/BrightnessAuto";
import { useDispatch, useSelector } from "react-redux";

import { IState } from "src/types";
import { toggleTheme } from "src/store/actions/rpc";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useSelector((state: IState) => state.rpc.theme);

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
