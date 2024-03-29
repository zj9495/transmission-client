import produce from "immer";

import { AddState } from "src/types";
import {
  TOGGLE_ADD_TORRENT_DIALOG,
  SHOW_TORRENT_DOWNLOAD_OPTIONS,
  CLOSE_TORRENT_DOWNLOAD_OPTIONS,
  SET_DOWNLOAD_SELECTED_FILES,
  SET_DOWNLOAD_FILES,
  SET_FREE_DISK_SPACE,
} from "src/store/constants/add";

export interface Action {
  type: string;
  payload: any;
}

export const initialAddState: AddState = {
  open: false,
  torrentDownloadOptions: {
    id: null,
    freeDiskSpace: 0,
    open: false,
    info: null,
    files: [],
    selectedFilesIds: [],
    selectedFiles: [],
  },
};

export default (state = initialAddState, action: Action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_ADD_TORRENT_DIALOG:
        draft.open = action.payload;
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
      default:
        return state;
    }
  });
