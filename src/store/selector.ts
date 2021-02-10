import { IState } from "src/types";

export const getSessionSelector = (state: IState) => state.rpc.session;
export const getDownloadDirSelector = (state: IState) =>
  state.rpc.session.downloadDir;
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

export const getTorrents = (state: IState) => state.rpc.torrents;

// Add Torrent
export const getAddTorrentDialogOpen = (state: IState) => state.app.open;

export const getSelectedIds = (state: IState) => state.rpc.selectedIds;
export const getSelectedTorrents = (state: IState) =>
  state.rpc.torrents.all.filter((torrent) =>
    state.rpc.selectedIds.includes(torrent.id)
  );

export const getMessageConfig = (state: IState) => state.app.messageConfig;
