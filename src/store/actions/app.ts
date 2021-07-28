/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { cloneDeep } from "lodash";

import {
  TOGGLE_ADD_TORRENT_DIALOG,
  SET_MESSAGE_BAR,
  SHOW_TORRENT_DOWNLOAD_OPTIONS,
  CLOSE_TORRENT_DOWNLOAD_OPTIONS,
  TOGGLE_REMOVE_TORRENTS_DIALOG,
  SET_DOWNLOAD_SELECTED_FILES,
  SET_DOWNLOAD_FILES,
  SET_FREE_DISK_SPACE,
  SHOW_TORRENT_DETAIL,
  HIDE_TORRENT_DETAIL,
} from "src/store/constants";
import { IMessageConfig, IState } from "src/types";
import {
  getTorrent,
  removeTorrents,
  setTorrent,
  startTorrents,
  getFreeSpace,
} from "src/api";

import {
  PRIORITY_HIGH,
  PRIORITY_NORMAL,
  PRIORITY_LOW,
  INVALID_STATUS,
} from "src/constants";

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

export const setDownloadSelectedFiles = (
  selectedFilesIds: (number | string)[]
) => (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => IState) => {
  const { files } = getState().app.torrentDownloadOptions;
  const selectedFiles = files.filter((file) =>
    selectedFilesIds.includes(file.id)
  );
  dispatch({
    type: SET_DOWNLOAD_SELECTED_FILES,
    payload: {
      selectedFilesIds,
      selectedFiles,
    },
  });
};

export const setFreeDiskSpace = (path: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  if (path) {
    getFreeSpace({ path }).then((res) => {
      dispatch({
        type: SET_FREE_DISK_SPACE,
        payload: res.data.arguments["size-bytes"],
      });
    });
  } else {
    dispatch({
      type: SET_FREE_DISK_SPACE,
      payload: INVALID_STATUS,
    });
  }
};

export const showTorrentDownloadOptions = (id: number) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IState
) => {
  const result = await getTorrent(id);
  const files = result.files.map((item, index) => ({
    ...item,
    ...result.fileStats[index],
    id: index,
    percentDone: item.bytesCompleted / item.length,
    fileFormat: item.name.slice(
      item.name.lastIndexOf(".") + 1,
      item.name.length
    ),
  }));
  dispatch({
    type: SHOW_TORRENT_DOWNLOAD_OPTIONS,
    payload: { id, result, files },
  });
  const selectedFilesIds = files.map((item) => item.id);
  setDownloadSelectedFiles(selectedFilesIds)(dispatch, getState);
  setFreeDiskSpace(result.downloadDir)(dispatch);
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

type filesWantedChangeParams = {
  value: boolean;
  rowIndex: number;
};

export const setDownloadFilesWanted = ({
  value,
  rowIndex,
}: filesWantedChangeParams) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IState
) => {
  const files = cloneDeep(getState().app.torrentDownloadOptions.files);

  files[rowIndex].wanted = value;
  dispatch({
    type: SET_DOWNLOAD_FILES,
    payload: files,
  });
};

type filesPriorityChangeParams = {
  value: 1 | 0 | -1;
  rowIndex: number;
};

export const setDownloadFilesPriority = ({
  value,
  rowIndex,
}: filesPriorityChangeParams) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IState
) => {
  const files = cloneDeep(getState().app.torrentDownloadOptions.files);

  files[rowIndex].priority = value;
  dispatch({
    type: SET_DOWNLOAD_FILES,
    payload: files,
  });
};

export const addTorrentAdvancedMode = ({
  location,
  paused = false,
}: {
  name?: string;
  location?: string;
  paused: boolean;
}) => (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => IState) => {
  const { id, files, selectedFilesIds } = getState().app.torrentDownloadOptions;
  const filesWanted = selectedFilesIds;
  const filesUnwanted = files
    .filter((file) => !filesWanted.includes(file.id))
    .map((file) => file.id);
  const priorityHigh = files
    .filter((file) => file.priority === PRIORITY_HIGH)
    .map((file) => file.id);
  const priorityNormal = files
    .filter((file) => file.priority === PRIORITY_NORMAL)
    .map((file) => file.id);
  const priorityLow = files
    .filter((file) => file.priority === PRIORITY_LOW)
    .map((file) => file.id);

  setTorrent({
    id: id as number,
    filesWanted,
    filesUnwanted,
    priorityHigh,
    priorityNormal,
    priorityLow,
    location,
  });
  if (!paused) {
    startTorrents([id as number]);
  }
  dispatch(closeTorrentDownloadOptionsDialog(id as number));
};

export const showTorrentDetail = (id: Number) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: SHOW_TORRENT_DETAIL,
    payload: {
      open: true,
      id,
    },
  });
};

export const hideTorrentDetail = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: HIDE_TORRENT_DETAIL,
    payload: {
      open: false,
    },
  });
};
