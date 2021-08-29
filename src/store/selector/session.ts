import { IState } from "src/types";

export const getSessionSelector = (state: IState) => state.session.session;
export const getDownloadDirSelector = (state: IState) =>
  state.session.session.downloadDir;
export const getStatsSelector = (state: IState) => state.session.stats;
export const getSpeedBytesSelector = (state: IState) =>
  state.session.session.units.speedBytes;
export const getSpeedUnitsSelector = (state: IState) =>
  state.session.session.units.speedUnits;
export const getSizeBytesSelector = (state: IState) =>
  state.session.session.units.sizeBytes;
export const getSizeUnitsSelector = (state: IState) =>
  state.session.session.units.sizeUnits;

// connect status
export const getConnectedSelector = (state: IState) => state.session.connected;
