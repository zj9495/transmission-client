import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Helmet } from "react-helmet";

import { Tooltip, Typography, Fade, Box, Hidden } from "@mui/material";
import type { Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import {
  getStatsSelector,
  getSessionSelector,
  getConnectedSelector,
} from "src/store/selector/session";
import { formatSpeed, formatSize } from "src/utils/formatter";
import UploadIcon from "@mui/icons-material/Publish";
import DownloadIcon from "@mui/icons-material/GetApp";
import StorageIcon from "@mui/icons-material/Storage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      lineHeight: "1.5rem",
    },
    iconContainer: {
      display: "flex",
      alignItems: "center",
    },
    split: {
      color: "#777",
      margin: theme.spacing(0, 0.5),
    },
    status: {
      width: "0.875rem",
      height: "0.875rem",
      verticalAlign: "middle",
      position: "relative",
      display: "inline-block",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(0.5),
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        backgroundColor: theme.palette.warning.main,
      },
      "&::before": {
        width: "14px",
        height: "14px",
        borderRadius: "14px",
        opacity: 0.3,
        left: 0,
      },
      "&::after": {
        width: "6px",
        height: "6px",
        borderRadius: "6px",
        opacity: 0.6,
        top: "4px",
        left: "4px",
      },
    },
    connected: {
      "&::before, &::after": {
        backgroundColor: "#00c878",
      },
    },
    hide: {
      display: "none",
    },
  })
);

const AppStatusBar = () => {
  const stats = useSelector(getStatsSelector);
  const session = useSelector(getSessionSelector);
  const connected = useSelector(getConnectedSelector);
  const downloadSpeed = formatSpeed(stats.downloadSpeed, true);
  const uploadSpeed = formatSpeed(stats.uploadSpeed, true);
  const freeSpace = formatSize(session.downloadDirFreeSpace);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>
          ↓ {downloadSpeed} ↑ {uploadSpeed} - Transmission Client
        </title>
      </Helmet>
      <i
        className={clsx(classes.status, {
          [classes.connected]: connected,
        })}
        data-testid={connected ? "connected-icon" : "connecting-icon"}
      />
      <Fade in={!connected} timeout={1000}>
        <Typography className={clsx({ [classes.hide]: connected })}>
          <FormattedMessage
            id={connected ? "system.status.connected" : "system.status.connect"}
          />
        </Typography>
      </Fade>
      <Fade in={connected} timeout={1000}>
        <Box display="flex">
          <span className={classes.split}>|</span>
          <Tooltip title={<FormattedMessage id="statusbar.downloadspeed" />}>
            <span className={classes.iconContainer}>
              <DownloadIcon />
              <span data-testid="download-speed">{downloadSpeed}</span>
            </span>
          </Tooltip>
          <span className={classes.split}>|</span>
          <Tooltip title={<FormattedMessage id="statusbar.uploadspeed" />}>
            <span className={classes.iconContainer}>
              <UploadIcon />
              <span data-testid="seed-speed">{uploadSpeed}</span>
            </span>
          </Tooltip>
          <span className={classes.split}>|</span>
          <Tooltip
            title={
              <FormattedMessage id="dialog.systemConfig.downloadDirFreeSpace" />
            }
          >
            <span className={classes.iconContainer}>
              <StorageIcon />
              <span data-testid="free-space">{freeSpace}</span>
            </span>
          </Tooltip>
          <Hidden xsDown>
            <span className={classes.split}>|</span>
            <span>
              Transmission <FormattedMessage id="statusbar.version" />
              {session.version}
            </span>
            <span className={classes.split}>|</span>
            <span>
              RPC: <span data-testid="rpc-version">{session.rpcVersion}</span>
            </span>
          </Hidden>
        </Box>
      </Fade>
    </div>
  );
};

export default AppStatusBar;
