/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
  SHOW_TORRENT_DETAIL,
  HIDE_TORRENT_DETAIL,
} from "src/store/constants/detail";

export const showTorrentDetail = (id: Number) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: SHOW_TORRENT_DETAIL,
    payload: {
      id,
    },
  });
};

export const hideTorrentDetail = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: HIDE_TORRENT_DETAIL,
  });
};
