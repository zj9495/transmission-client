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

import {
  toggleAddTorrentDialog,
  toggleRemoveTorrentsDialog,
} from "src/store/actions/app";
import { getSelectedIds } from "src/store/selector";

import {
  startTorrents,
  stopTorrents,
  reannounceTorrents,
  verifyTorrents,
} from "src/api";

const ActionBar = () => {
  const dispatch = useDispatch();
  const selectedIds = useSelector(getSelectedIds);

  const disableAction = selectedIds.length === 0;

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
    dispatch(toggleRemoveTorrentsDialog(true));
  };

  return (
    <Box>
      <Tooltip title={<FormattedMessage id="toolbar.tip.addTorrent" />}>
        <IconButton data-testid="add-btn" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.start" />}>
        <IconButton disabled={disableAction} onClick={handleStart}>
          <PlayArrowIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.pause" />}>
        <IconButton disabled={disableAction} onClick={handleStop}>
          <PauseIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.deleteData" />}>
        <IconButton
          data-testid="delete-btn"
          disabled={disableAction}
          onClick={handleRemove}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.recheck" />}>
        <IconButton disabled={disableAction} onClick={handleVerify}>
          <StorageIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.morePeers" />}>
        <IconButton disabled={disableAction} onClick={handleReannounce}>
          <SettingsInputAntennaIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ActionBar;
