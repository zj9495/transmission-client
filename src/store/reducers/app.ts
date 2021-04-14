import produce from "immer";

import { IAppState } from "src/types";
import {
  TOGGLE_ADD_TORRENT_DIALOG,
  SET_MESSAGE_BAR,
  SHOW_TORRENT_DOWNLOAD_OPTIONS,
  CLOSE_TORRENT_DOWNLOAD_OPTIONS,
  TOGGLE_REMOVE_TORRENTS_DIALOG,
  SET_DOWNLOAD_SELECTED_FILES,
  SET_DOWNLOAD_FILES,
  SET_FREE_DISK_SPACE,
} from "../constants";

export interface Action {
  type: string;
  payload: any;
}

export const initialAppState: IAppState = {
  open: false,
  messageConfig: {
    key: 0,
    open: false,
    loading: false,
    message: "",
    severity: "info",
  },
  torrentDownloadOptions: {
    id: null,
    freeDiskSpace: 0,
    open: false,
    info: null,
    files: [],
    selectedFilesIds: [],
    selectedFiles: [],
  },
  removeTorrents: {
    open: false,
  },
};

export default (state = initialAppState, action: Action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_ADD_TORRENT_DIALOG:
        draft.open = action.payload;
        break;
      case SET_MESSAGE_BAR:
        draft.messageConfig = action.payload;
        break;
      case SHOW_TORRENT_DOWNLOAD_OPTIONS:
        draft.torrentDownloadOptions.id = action.payload.id;
        draft.torrentDownloadOptions.info = action.payload.info;
        draft.torrentDownloadOptions.open = true;
        draft.torrentDownloadOptions.files = action.payload.files;
        break;
      case CLOSE_TORRENT_DOWNLOAD_OPTIONS:
        draft.torrentDownloadOptions.id = null;
        draft.torrentDownloadOptions.info = null;
        draft.torrentDownloadOptions.open = false;
        draft.torrentDownloadOptions.files = [];
        break;
      case SET_DOWNLOAD_SELECTED_FILES:
        draft.torrentDownloadOptions.selectedFilesIds =
          action.payload.selectedFilesIds;
        draft.torrentDownloadOptions.selectedFiles =
          action.payload.selectedFiles;
        break;
      case SET_DOWNLOAD_FILES:
        draft.torrentDownloadOptions.files = action.payload;
        break;
      case SET_FREE_DISK_SPACE:
        draft.torrentDownloadOptions.freeDiskSpace = action.payload;
        break;
      case TOGGLE_REMOVE_TORRENTS_DIALOG:
        draft.removeTorrents.open = action.payload;
        break;
      default:
        return state;
    }
  });
