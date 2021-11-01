/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { cloneDeep } from "lodash";

import {
  TOGGLE_ADD_TORRENT_DIALOG,
  SHOW_TORRENT_DOWNLOAD_OPTIONS,
  CLOSE_TORRENT_DOWNLOAD_OPTIONS,
  SET_DOWNLOAD_SELECTED_FILES,
  SET_DOWNLOAD_FILES,
  SET_FREE_DISK_SPACE,
} from "src/store/constants/add";
import { getTorrentDownloadOptions } from "src/store/selector/add";
import { IState } from "src/types";
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

export const toggleAddTorrentDialog = (open: boolean) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: TOGGLE_ADD_TORRENT_DIALOG,
    payload: open,
  });
};

export const setDownloadSelectedFiles = (
  selectedFilesIds: (number | string)[]
) => (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => IState) => {
  const { files } = getTorrentDownloadOptions(getState());
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
    getFreeSpace(path).then((res) => {
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
    payload: { id, info: result, files },
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

type filesWantedChangeParams = {
  value: boolean;
  id: number;
};

export const setDownloadFilesWanted = ({
  value,
  id,
}: filesWantedChangeParams) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IState
) => {
  const files = cloneDeep(getTorrentDownloadOptions(getState()).files);

  files.forEach((file) => {
    if (file.id === id) {
      file.wanted = value;
    }
  });

  dispatch({
    type: SET_DOWNLOAD_FILES,
    payload: files,
  });
};

type filesPriorityChangeParams = {
  value: 1 | 0 | -1;
  id: number;
};

export const setDownloadFilesPriority = ({
  value,
  id,
}: filesPriorityChangeParams) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IState
) => {
  const files = cloneDeep(getTorrentDownloadOptions(getState()).files);

  files.forEach((file) => {
    if (file.id === id) {
      file.priority = value;
    }
  });

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
  const { id, files, selectedFilesIds } = getTorrentDownloadOptions(getState());
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
