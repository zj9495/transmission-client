import { IAppState } from "../types";

export const getSessionSelector = (state: IAppState) => state.root.session;
export const getStatsSelector = (state: IAppState) => state.root.stats;
export const getSpeedBytesSelector = (state: IAppState) =>
  state.root.session.units.speedBytes;
export const getSpeedUnitsSelector = (state: IAppState) =>
  state.root.session.units.speedUnits;
export const getSizeBytesSelector = (state: IAppState) =>
  state.root.session.units.sizeBytes;
export const getSizeUnitsSelector = (state: IAppState) =>
  state.root.session.units.sizeUnits;

export const getMenuOpen = (state: IAppState) => state.root.menuOpen;

export const getAllTorrents = (state: IAppState) => state.root.allTorrents;

// Add Torrent
export const getAddTorrentDialogOpen = (state: IAppState) => state.add.open;

export const getSelectedIds = (state: IAppState) => state.root.selectedIds;
