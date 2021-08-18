import React from "react";
import { FormattedMessage } from "react-intl";

import { Menu, MenuItem, Divider } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import DeleteIcon from "@material-ui/icons/Delete";
import StorageIcon from "@material-ui/icons/Storage";
import SettingsInputAntennaIcon from "@material-ui/icons/SettingsInputAntenna";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import VerticalAlignTopOutlinedIcon from "@material-ui/icons/VerticalAlignTopOutlined";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import VerticalAlignBottomOutlinedIcon from "@material-ui/icons/VerticalAlignBottomOutlined";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";

import type { TorrentId, ITorrent, QueueType } from "src/types";
import { STATUS_TYPES } from "src/constants";
import {
  startTorrents,
  stopTorrents,
  removeTorrents,
  reannounceTorrents,
  verifyTorrents,
  moveQueue,
} from "src/api";

export type ContextMenuProps = {
  id: TorrentId;
  open: boolean;
  x: null | number;
  y: null | number;
  torrent: ITorrent | null;
  onClose: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(1),
    },
  })
);

const ContextMenu = ({
  id,
  torrent,
  open,
  x,
  y,
  onClose,
}: ContextMenuProps) => {
  const classes = useStyles();
  const disableStart = React.useMemo(
    () => torrent?.status !== STATUS_TYPES.paused,
    [torrent]
  );
  const disablePause = React.useMemo(
    () =>
      [
        STATUS_TYPES.paused,
        STATUS_TYPES.check,
        STATUS_TYPES.checkwait,
      ].includes(torrent?.status as number),
    [torrent]
  );
  const disableRecheck = React.useMemo(
    () => torrent?.status !== STATUS_TYPES.paused,
    [torrent]
  );
  const disableMorePeers = React.useMemo(
    () =>
      [
        STATUS_TYPES.paused,
        STATUS_TYPES.check,
        STATUS_TYPES.checkwait,
      ].includes(torrent?.status as number),
    [torrent]
  );

  const handleStart = () => {
    startTorrents([id]);
    onClose();
  };

  const handleStop = () => {
    stopTorrents([id]);
    onClose();
  };

  const handleReannounce = () => {
    reannounceTorrents([id]);
    onClose();
  };

  const handleVerify = () => {
    verifyTorrents([id]);
    onClose();
  };

  const handleRemove = () => {
    removeTorrents([id]);
    onClose();
  };

  const handleMoveQueue = (type: QueueType) => {
    moveQueue(type, [id]);
    onClose();
  };

  const handleCopyPath = () => {
    navigator.clipboard.writeText(torrent?.downloadDir as string);
    onClose();
  };

  const handleCopyMagnetLink = () => {
    navigator.clipboard.writeText(torrent?.magnetLink as string);
    onClose();
  };

  return (
    <Menu
      data-testid="context-menu"
      keepMounted
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        y !== null && x !== null ? { top: y, left: x } : undefined
      }
      TransitionProps={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        "data-testid": "context-menu-transition",
      }}
    >
      <MenuItem
        data-testid="context-menu-start"
        onClick={handleStart}
        disabled={disableStart}
      >
        <PlayArrowIcon className={classes.icon} />
        <FormattedMessage id="toolbar.tip.start" />
      </MenuItem>
      <MenuItem
        data-testid="context-menu-pause"
        onClick={handleStop}
        disabled={disablePause}
      >
        <PauseIcon className={classes.icon} />
        <FormattedMessage id="toolbar.tip.pause" />
      </MenuItem>
      <Divider />
      <MenuItem data-testid="context-menu-rename" onClick={onClose}>
        <EditOutlinedIcon className={classes.icon} />
        <FormattedMessage id="toolbar.tip.rename" />
      </MenuItem>
      <MenuItem data-testid="context-menu-remove" onClick={handleRemove}>
        <DeleteIcon className={classes.icon} />
        <FormattedMessage id="toolbar.tip.remove" />
      </MenuItem>
      <MenuItem
        data-testid="context-menu-recheck"
        onClick={handleVerify}
        disabled={disableRecheck}
      >
        <StorageIcon className={classes.icon} />
        <FormattedMessage id="toolbar.tip.recheck" />
      </MenuItem>
      <Divider />
      <MenuItem
        data-testid="context-menu-more-peers"
        onClick={handleReannounce}
        disabled={disableMorePeers}
      >
        <SettingsInputAntennaIcon className={classes.icon} />
        <FormattedMessage id="toolbar.tip.morePeers" />
      </MenuItem>
      <MenuItem onClick={onClose}>
        <FolderOpenOutlinedIcon className={classes.icon} />
        <FormattedMessage id="toolbar.tip.changeDownloadDir" />
      </MenuItem>
      <MenuItem onClick={handleCopyPath}>
        <FileCopyOutlinedIcon className={classes.icon} />
        <FormattedMessage id="toolbar.tip.copyPathToClipboard" />
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => handleMoveQueue("top")}>
        <VerticalAlignTopOutlinedIcon className={classes.icon} />
        <FormattedMessage id="menus.queue.moveTop" />
      </MenuItem>
      <MenuItem onClick={() => handleMoveQueue("up")}>
        <ArrowUpwardOutlinedIcon className={classes.icon} />
        <FormattedMessage id="menus.queue.moveUp" />
      </MenuItem>
      <MenuItem onClick={() => handleMoveQueue("down")}>
        <ArrowDownwardOutlinedIcon className={classes.icon} />
        <FormattedMessage id="menus.queue.moveDown" />
      </MenuItem>
      <MenuItem onClick={() => handleMoveQueue("bottom")}>
        <VerticalAlignBottomOutlinedIcon className={classes.icon} />
        <FormattedMessage id="menus.queue.moveBottom" />
      </MenuItem>
      <MenuItem onClick={handleCopyMagnetLink}>
        <LinkOutlinedIcon className={classes.icon} />
        <FormattedMessage id="menus.copyMagnetLink" />
      </MenuItem>
    </Menu>
  );
};

export default ContextMenu;
