import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux'

import { ITorrent, IUnits } from '../../types'
import { getSizeBytesSelector, getSizeUnitsSelector } from '../../store/selector'
import {formatBytes} from '../../utils/units'

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
  const { totalSize, downloadedEver } = props.torrent;
  const { sizeBytes, sizeUnits } = props.config
  const torrentSize = formatBytes(totalSize, sizeBytes, sizeUnits)
  console.log('totalSize, sizeBytes, sizeUnits: ', totalSize, sizeBytes, sizeUnits);
  console.log('torrentSize: ', torrentSize);

  const percent = getPercent(totalSize, downloadedEver)

  return (
    <div className={classes.root}>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={percent} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${percent}% ${torrentSize}`}
        </Typography>
      </Box>
    </div>
  );
}
