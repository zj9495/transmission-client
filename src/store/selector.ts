import { IState } from "../types";
import { STATUS_TYPES } from "../constants";

export const getSessionSelector = (state: IState) => state.rpc.session;
export const getStatsSelector = (state: IState) => state.rpc.stats;
export const getSpeedBytesSelector = (state: IState) =>
  state.rpc.session.units.speedBytes;
export const getSpeedUnitsSelector = (state: IState) =>
  state.rpc.session.units.speedUnits;
export const getSizeBytesSelector = (state: IState) =>
  state.rpc.session.units.sizeBytes;
export const getSizeUnitsSelector = (state: IState) =>
  state.rpc.session.units.sizeUnits;

export const getMenuOpen = (state: IState) => state.rpc.menuOpen;

export const getAllTorrents = (state: IState) => state.rpc.torrents;
export const getDownloadingTorrents = (state: IState) =>
  state.rpc.torrents.filter((item) => item.status === STATUS_TYPES.download);
export const getDownloadWaitingTorrents = (state: IState) =>
  state.rpc.torrents.filter(
    (item) => item.status === STATUS_TYPES.downloadwait
  );
export const getPausedTorrents = (state: IState) =>
  state.rpc.torrents.filter((item) => item.status === STATUS_TYPES.paused);
export const getActiveTorrents = (state: IState) =>
  state.rpc.torrents.filter((item) => item.status === STATUS_TYPES.paused);
export const getSeedingTorrents = (state: IState) =>
  state.rpc.torrents.filter((item) => item.status === STATUS_TYPES.seed);
export const getSeedWaitingTorrents = (state: IState) =>
  state.rpc.torrents.filter((item) => item.status === STATUS_TYPES.seedwait);
export const getCheckingTorrents = (state: IState) =>
  state.rpc.torrents.filter((item) => item.status === STATUS_TYPES.check);
export const getCheckWaitingTorrents = (state: IState) =>
  state.rpc.torrents.filter((item) => item.status === STATUS_TYPES.checkwait);
export const getWarningTorrents = (state: IState) =>
  state.rpc.torrents.filter((item) => item.status === STATUS_TYPES.paused);
export const getErrorTorrents = (state: IState) =>
  state.rpc.torrents.filter((item) => item.status === STATUS_TYPES.paused);

// Add Torrent
export const getAddTorrentDialogOpen = (state: IState) => state.app.open;

export const getSelectedIds = (state: IState) => state.rpc.selectedIds;
