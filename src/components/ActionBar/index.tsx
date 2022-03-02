import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tooltip, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import StorageIcon from "@mui/icons-material/Storage";
import { FormattedMessage } from "react-intl";
import { GridToolbar } from "@mui/x-data-grid-pro";
import { makeStyles, createStyles } from "@mui/styles";
import type { Theme } from "@mui/material";

import { toggleAddTorrentDialog } from "src/store/actions/add";
import { toggleRemoveTorrentsDialog } from "src/store/actions/app";
import { getSelectedIds } from "src/store/selector/list";

import {
  startTorrents,
  stopTorrents,
  reannounceTorrents,
  verifyTorrents,
} from "src/api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      "& .MuiButton-root": {
        [theme.breakpoints.down("sm")]: {
          minWidth: 12,

          "& .MuiButton-startIcon": {
            marginLeft: 4,
            marginRight: 4,
          },
        },
      },
    },
  })
);

const ActionBar = () => {
  const dispatch = useDispatch();
  const selectedIds = useSelector(getSelectedIds);
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <Stack className={classes.container} direction="row">
      <Tooltip title={<FormattedMessage id="toolbar.tip.addTorrent" />}>
        <span>
          <Button
            size="small"
            color="primary"
            data-testid="add-btn"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            {isMobile ? "" : "Add"}
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.start" />}>
        <span>
          <Button
            size="small"
            color="primary"
            disabled={disableAction}
            startIcon={<PlayArrowIcon />}
            onClick={handleStart}
          >
            {isMobile ? "" : "Start"}
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.pause" />}>
        <span>
          <Button
            size="small"
            color="primary"
            disabled={disableAction}
            startIcon={<PauseIcon />}
            onClick={handleStop}
          >
            {isMobile ? "" : "Pause"}
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.deleteData" />}>
        <span>
          <Button
            size="small"
            color="primary"
            data-testid="delete-btn"
            disabled={disableAction}
            startIcon={<DeleteIcon />}
            onClick={handleRemove}
          >
            {isMobile ? "" : "Delete"}
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.recheck" />}>
        <span>
          <Button
            size="small"
            color="primary"
            disabled={disableAction}
            startIcon={<StorageIcon />}
            onClick={handleVerify}
          >
            {isMobile ? "" : "Recheck"}
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="toolbar.tip.morePeers" />}>
        <span>
          <Button
            size="small"
            color="primary"
            disabled={disableAction}
            startIcon={<SettingsInputAntennaIcon />}
            onClick={handleReannounce}
          >
            {isMobile ? "" : "More Peers"}
          </Button>
        </span>
      </Tooltip>
      <GridToolbar style={{ padding: 0 }} />
    </Stack>
  );
};

export default ActionBar;
