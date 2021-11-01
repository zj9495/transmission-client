import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import StorageIcon from "@mui/icons-material/Storage";
import { FormattedMessage } from "react-intl";

import { toggleAddTorrentDialog } from "src/store/actions/add";
import { toggleRemoveTorrentsDialog } from "src/store/actions/app";
import { getSelectedIds } from "src/store/selector/list";

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
        <span>
          <IconButton data-testid="add-btn" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.start" />}>
        <span>
          <IconButton disabled={disableAction} onClick={handleStart}>
            <PlayArrowIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.pause" />}>
        <span>
          <IconButton disabled={disableAction} onClick={handleStop}>
            <PauseIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.deleteData" />}>
        <span>
          <IconButton
            data-testid="delete-btn"
            disabled={disableAction}
            onClick={handleRemove}
          >
            <DeleteIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.recheck" />}>
        <span>
          <IconButton disabled={disableAction} onClick={handleVerify}>
            <StorageIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.morePeers" />}>
        <span>
          <IconButton disabled={disableAction} onClick={handleReannounce}>
            <SettingsInputAntennaIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export default ActionBar;
