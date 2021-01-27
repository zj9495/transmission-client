import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SettingsInputAntennaIcon from "@material-ui/icons/SettingsInputAntenna";
import StorageIcon from "@material-ui/icons/Storage";
import { FormattedMessage } from "react-intl";

import { toggleAddTorrentDialog } from "../../store/actions/app";
import { getSelectedIds } from "../../store/selector";

import {
  startTorrents,
  stopTorrents,
  reannounceTorrents,
  verifyTorrents,
  removeTorrents,
} from "../../api";

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

  const handleVerify = () => {
    verifyTorrents(selectedIds);
  };

  const handleRemove = () => {
    removeTorrents(selectedIds, true);
  };

  return (
    <Box>
      <Tooltip title={<FormattedMessage id="toolbar.tip.addTorrent" />}>
        <IconButton onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.start" />}>
        <IconButton>
          <PlayArrowIcon onClick={handleStart} />
        </IconButton>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.pause" />}>
        <IconButton onClick={handleStop}>
          <PauseIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.deleteData" />}>
        <IconButton onClick={handleRemove}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.recheck" />}>
        <IconButton onClick={handleVerify}>
          <StorageIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.morePeers" />}>
        <IconButton onClick={handleReannounce}>
          <SettingsInputAntennaIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ActionBar;
