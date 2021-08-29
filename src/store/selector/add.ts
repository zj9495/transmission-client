import { IState } from "src/types";

// Add Torrent
export const getAddTorrentDialogOpen = (state: IState) => state.add.open;
export const getTorrentDownloadOptions = (state: IState) =>
  state.add.torrentDownloadOptions;
export const getFreeDiskSpace = (state: IState) =>
  state.add.torrentDownloadOptions.freeDiskSpace;

// Files filter
export const getSelectedFiles = (state: IState) =>
  state.add.torrentDownloadOptions.selectedFiles;
