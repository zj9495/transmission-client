/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { STATUS_TYPES } from "src/constants";
import { ITorrent, ITorrents } from "src/types";

import { getTorrents } from "src/api";
import { SET_TORRENTS, SET_SELECTED_IDS } from "src/store/constants/list";

export const getTorrentsAction = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) =>
  getTorrents().then((res) => {
    const torrents: ITorrent[] = res.data.arguments.torrents || [];
    const payload: ITorrents = {
      all: torrents,
      downloading: torrents.filter(
        (item) => item.status === STATUS_TYPES.download
      ),
      downloadWaiting: torrents.filter(
        (item) => item.status === STATUS_TYPES.downloadwait
      ),
      paused: torrents.filter((item) => item.status === STATUS_TYPES.paused),
      active: torrents.filter((item) => item.rateDownload || item.rateUpload),
      seeding: torrents.filter((item) => item.status === STATUS_TYPES.seed),
      seedWaiting: torrents.filter(
        (item) => item.status === STATUS_TYPES.seedwait
      ),
      checking: torrents.filter((item) => item.status === STATUS_TYPES.check),
      checkWaiting: torrents.filter(
        (item) => item.status === STATUS_TYPES.checkwait
      ),
      warning: [],
      error: torrents.filter((item) => item.error),
    };

    dispatch({
      type: SET_TORRENTS,
      payload,
    });
  });

export const setSelectedIds = (payload: number[]) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: SET_SELECTED_IDS,
    payload,
  });
};
