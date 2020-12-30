import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { ITorrent, IUnits } from '../../types'
import {formatBytes} from '../../utils/units'
import {formatLeftTime} from '../../utils/times'


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

interface Props {
  torrent: ITorrent;
  config: IUnits;
}

export default function Progress(props: Props) {
  const classes = useStyles();
  const { totalSize, leftUntilDone, percentDone, rateUpload, rateDownload, uploadedEver } = props.torrent;
  const { sizeBytes, sizeUnits } = props.config
  const { speedBytes, speedUnits } = props.config
  const torrentSize = formatBytes(totalSize, sizeBytes, sizeUnits)
  const leftTime = formatLeftTime(leftUntilDone / rateDownload * 1000)
  const uploadSpeed = formatBytes(rateUpload, speedBytes, speedUnits)
  const downloadSpeed = formatBytes(rateDownload, speedBytes, speedUnits)
  const uploadSize = formatBytes(uploadedEver, sizeBytes, sizeUnits)
  const downloadSize = formatBytes(totalSize - leftUntilDone, sizeBytes, sizeUnits)

  const percent = (percentDone * 100).toFixed(2)

  return (
    <div className={classes.root}>
      <Box>
        <Typography variant="body2" color="textSecondary">
          <KeyboardArrowDownIcon fontSize="inherit" />{downloadSpeed} {downloadSize}
          <KeyboardArrowUpIcon fontSize="inherit" />{uploadSpeed} {uploadSize}
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
