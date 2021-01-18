import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SettingsInputAntennaIcon from "@material-ui/icons/SettingsInputAntenna";

import { toggleAddTorrentDialog } from "../../store/actions/add";
import { getSelectedIds } from "../../store/selector";

import { startTorrents, stopTorrents, reannounceTorrents } from "../../api";

const ActionBar = () => {
  const dispatch = useDispatch();
  const selectedIds = useSelector(getSelectedIds);

  const handleAdd = () => {
    dispatch(toggleAddTorrentDialog(true));
  };

  const handleStart = () => {
    startTorrents(selectedIds);
  };

  const handleStop = () => {
    stopTorrents(selectedIds);
  };

  const handleReannounce = () => {
    reannounceTorrents(selectedIds);
  };

  return (
    <Box>
      <IconButton onClick={handleAdd}>
        <AddIcon />
      </IconButton>
      <IconButton>
        <PlayArrowIcon onClick={handleStart} />
      </IconButton>
      <IconButton onClick={handleStop}>
        <PauseIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={handleReannounce}>
        <SettingsInputAntennaIcon />
      </IconButton>
    </Box>
  );
};

export default ActionBar;
