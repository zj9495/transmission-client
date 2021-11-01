import React from "react";
import { makeStyles } from "@mui/styles";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { ITorrent } from "src/types";
import { formatSize, formatSpeed, formatLeftTime } from "src/utils/formatter";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

interface Props {
  torrent: ITorrent;
}

export default function Progress({ torrent }: Props) {
  const classes = useStyles();

  const {
    totalSize,
    leftUntilDone,
    percentDone,
    rateUpload,
    rateDownload,
    uploadedEver,
    uploadRatio,
  } = torrent;
  const torrentSize = formatSize(totalSize);
  const leftTime = leftUntilDone
    ? formatLeftTime((leftUntilDone / rateDownload) * 1000)
    : "";
  const uploadSpeed = formatSpeed(rateUpload);
  const downloadSpeed = formatSpeed(rateDownload);
  const uploadSize = formatSize(uploadedEver);
  const downloadSize = formatSize(totalSize - leftUntilDone);

  const percent = (percentDone * 100).toFixed(2);

  return (
    <div className={classes.root}>
      <Box>
        <Typography variant="body2" color="textSecondary">
          <KeyboardArrowDownIcon fontSize="inherit" />
          {downloadSpeed} {downloadSize}
          <KeyboardArrowUpIcon fontSize="inherit" />
          {uploadSpeed} {uploadSize} {uploadRatio < 0 ? "-" : uploadRatio}
        </Typography>
      </Box>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={Number(percent)} />
      </Box>
      <Box>
        <Typography variant="body2" color="textSecondary">
          {`${percent}% ${torrentSize} ${leftTime}`}
        </Typography>
      </Box>
    </div>
  );
}
