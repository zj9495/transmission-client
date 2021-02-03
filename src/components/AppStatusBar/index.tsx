import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { getStatsSelector, getSessionSelector } from "src/store/selector";
import { formatSpeed, formatSize } from "src/utils/formatter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    <div>
      <span>
        <FormattedMessage id="statusbar.downloadspeed" />
        {downloadSpeed}
      </span>
      <span className={classes.split}>|</span>
      <span>
        <FormattedMessage id="statusbar.uploadspeed" />
        {uploadSpeed}
      </span>
      <span className={classes.split}>|</span>
      <span>
        <FormattedMessage id="dialog.systemConfig.downloadDirFreeSpace" />
        {freeSpace}
      </span>
      <span className={classes.split}>|</span>
      <span>
        Transmission <FormattedMessage id="statusbar.version" />
        {session.version}
      </span>
      <span className={classes.split}>|</span>
      <span>RPC: {session.rpcVersion}</span>
    </div>
  );
};

export default AppStatusBar;
