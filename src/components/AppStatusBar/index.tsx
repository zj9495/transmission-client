import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

import { Tooltip } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { getStatsSelector, getSessionSelector } from "src/store/selector";
import { formatSpeed, formatSize } from "src/utils/formatter";
import UploadIcon from "@material-ui/icons/Publish";
import DownloadIcon from "@material-ui/icons/GetApp";
import StorageIcon from "@material-ui/icons/Storage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
    iconContainer: {
      display: "flex",
      alignItems: "center",
      lineHeight: "1.5rem",
    },
    split: {
      color: "#777",
      margin: theme.spacing(0, 0.5),
    },
  })
);

const AppStatusBar = () => {
  const stats = useSelector(getStatsSelector);
  const session = useSelector(getSessionSelector);
  const downloadSpeed = formatSpeed(stats.downloadSpeed, true);
  const uploadSpeed = formatSpeed(stats.uploadSpeed, true);
  const freeSpace = formatSize(session.downloadDirFreeSpace);
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
      <span className={classes.split}>|</span>
      <span>
        Transmission <FormattedMessage id="statusbar.version" />
        {session.version}
      </span>
      <span className={classes.split}>|</span>
      <span>
        RPC: <span data-testid="rpc-version">{session.rpcVersion}</span>
      </span>
    </div>
  );
};

export default AppStatusBar;
