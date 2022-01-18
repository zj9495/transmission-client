/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { STATUS_TYPES, TORRENT_ERROR } from "src/constants";
import { ITorrent, ITorrents } from "src/types";

import { getTorrents } from "src/api";
import { SET_TORRENTS, SET_SELECTED_IDS } from "src/store/constants/list";

export const getTorrentsAction = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) =>
  getTorrents().then((res) => {
    const torrents: ITorrent[] = (res.data.arguments.torrents || []).map(
      (torrent: ITorrent) => {
        const { error, status } = torrent;
        let color: ITorrent["color"];
        if (error) {
          color = error === TORRENT_ERROR.TrackerWarning ? "warning" : "error";
        } else {
          switch (status) {
            case STATUS_TYPES.download:
            case STATUS_TYPES.paused:
              color = "primary";
              break;
            case STATUS_TYPES.checkwait:
            case STATUS_TYPES.check:
            case STATUS_TYPES.downloadwait:
            case STATUS_TYPES.seedwait:
              color = "info";
              break;
            case STATUS_TYPES.seed:
              color = "primary";
              break;
            default:
              color = "info";
          }
        }
        torrent.color = color;
        return torrent;
      }
    );
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
