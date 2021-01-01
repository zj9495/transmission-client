import React from 'react'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Box, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(0),
    },
  }),
);

const ActionBar = () => {
  const classes = useStyles()

  return (
    <Box>
      <IconButton>
        <AddIcon />
      </IconButton>
      <IconButton>
        <PlayArrowIcon />
      </IconButton>
      <IconButton>
        <PauseIcon />
      </IconButton>
      <IconButton>
        <StopIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}

export default ActionBar