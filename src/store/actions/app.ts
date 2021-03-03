/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
  TOGGLE_ADD_TORRENT_DIALOG,
  SET_MESSAGE_BAR,
  SHOW_TORRENT_DOWNLOAD_OPTIONS,
  CLOSE_TORRENT_DOWNLOAD_OPTIONS,
  TOGGLE_REMOVE_TORRENTS_DIALOG,
  SET_DOWNLOAD_SELECTED_FILES,
} from "src/store/constants";
import { IMessageConfig, IState, Torrent } from "src/types";
import { getTorrent, removeTorrents } from "src/api";

type TGetTorrentResult = {
  data: {
    arguments: {
      torrents: Torrent[];
    };
  };
};

export const toggleAddTorrentDialog = (open?: boolean) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
  // getState: () => IState
) => {
  // const payload = open === undefined ? getState().open : open

  dispatch({
    type: TOGGLE_ADD_TORRENT_DIALOG,
    payload: open,
  });
};

export const setMessageBar = (payload: IMessageConfig) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IState
) => {
  const key = (getState().app.messageConfig.key || 0) + 1;
  dispatch({
    type: SET_MESSAGE_BAR,
    payload: {
      ...payload,
      key,
    },
  });
};

export const setDownloadSelectedFiles = (ids: (number | string)[]) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: SET_DOWNLOAD_SELECTED_FILES,
    payload: ids,
  });
};

export const showTorrentDownloadOptions = (id: number) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const result: TGetTorrentResult = await getTorrent(id);
  const info = result.data.arguments.torrents[0];
  const files = info.files.map((item, index) => ({
    ...item,
    ...info.fileStats[index],
    id: index,
    percentDone: item.bytesCompleted / item.length,
    fileFormat: item.name.slice(
      item.name.lastIndexOf(".") + 1,
      item.name.length
    ),
  }));
  dispatch({
    type: SHOW_TORRENT_DOWNLOAD_OPTIONS,
    payload: { id, info, files },
  });
  const selectedFilesIds = files.map((item) => item.id);
  dispatch(setDownloadSelectedFiles(selectedFilesIds));
};

export const closeTorrentDownloadOptionsDialog = (
  id: number,
  cancel = false
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({
    type: CLOSE_TORRENT_DOWNLOAD_OPTIONS,
    payload: null,
  });
  if (cancel) {
    removeTorrents([id], true);
  }
};

export const toggleRemoveTorrentsDialog = (open?: boolean) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IState
) => {
  const payload =
    open === undefined ? getState().app.removeTorrents.open : open;

  dispatch({
    type: TOGGLE_REMOVE_TORRENTS_DIALOG,
    payload,
  });
};
