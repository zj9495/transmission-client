import { IAppState } from "../types";

export const getSessionSelector = (state: IAppState) => state.rpc.session;
export const getStatsSelector = (state: IAppState) => state.rpc.stats;
export const getSpeedBytesSelector = (state: IAppState) =>
  state.rpc.session.units.speedBytes;
export const getSpeedUnitsSelector = (state: IAppState) =>
  state.rpc.session.units.speedUnits;
export const getSizeBytesSelector = (state: IAppState) =>
  state.rpc.session.units.sizeBytes;
export const getSizeUnitsSelector = (state: IAppState) =>
  state.rpc.session.units.sizeUnits;

export const getMenuOpen = (state: IAppState) => state.rpc.menuOpen;

export const getAllTorrents = (state: IAppState) => state.rpc.allTorrents;

// Add Torrent
export const getAddTorrentDialogOpen = (state: IAppState) => state.app.open;

export const getSelectedIds = (state: IAppState) => state.rpc.selectedIds;
