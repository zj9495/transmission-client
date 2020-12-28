import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { ITorrent, IUnits } from '../../types'
import {formatBytes} from '../../utils/units'
import {formatLeftTime} from '../../utils/times'

const getPercent = (totalSize: number, downloadSize: number): number => {
  let percent = downloadSize / totalSize * 100
  if (percent > 100) {
    percent = 100
  } else if (percent < 0) {
    percent = 0
  }
  return Number(percent.toFixed(2))
}

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
  const { totalSize, leftUntilDone, percentDone } = props.torrent;
  const { sizeBytes, sizeUnits } = props.config
  const torrentSize = formatBytes(totalSize, sizeBytes, sizeUnits)
  const leftTime = formatLeftTime(leftUntilDone)

  const percent = (percentDone * 100).toFixed(2)

  return (
    <div className={classes.root}>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={Number(percent)} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${percent}% ${torrentSize} ~${leftTime}`}
        </Typography>
      </Box>
    </div>
  );
}
