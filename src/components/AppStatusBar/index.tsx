import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

import { getStatsSelector, getSessionSelector } from "../../store/selector";
import { formatSpeed, formatSize } from "../../utils/formatter";

const AppStatusBar = () => {
  const stats = useSelector(getStatsSelector);
  const session = useSelector(getSessionSelector);
  const downloadSpeed = formatSpeed(stats.downloadSpeed, true);
  const uploadSpeed = formatSpeed(stats.uploadSpeed, true);
  const freeSpace = formatSize(session.downloadDirFreeSpace);
  return (
    <div>
      <FormattedMessage id="statusbar.downloadspeed" />
      {downloadSpeed}
      &nbsp;|&nbsp;
      <FormattedMessage id="statusbar.uploadspeed" />
      {uploadSpeed}
      &nbsp;|&nbsp;
      <FormattedMessage id="dialog.systemConfig.downloadDirFreeSpace" />
      {freeSpace}
      &nbsp;|&nbsp; Transmission <FormattedMessage id="statusbar.version" />
      {session.version}
      &nbsp;|&nbsp; RPC: {session.rpcVersion}
    </div>
  );
};

export default AppStatusBar;
