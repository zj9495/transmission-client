import React, { useState, useCallback } from "react";
import { useIntl } from "react-intl";

import { Tooltip, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import Settings from "../Settings";

const ThemeToggle = () => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Tooltip title={intl.formatMessage({ id: "toolbar.tip.systemConfig" })}>
        <IconButton
          color="inherit"
          data-testid="settings-button"
          data-ga-event-category="header"
          onClick={handleClick}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Settings open={open} onClose={handleClose} />
    </>
  );
};

export default ThemeToggle;
