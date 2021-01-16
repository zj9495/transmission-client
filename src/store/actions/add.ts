/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { TOGGLE_ADD_TORRENT_DIALOG } from "../constants";
// import { IAppState } from "../../types";

export const toggleAddTorrentDialog = (open?: boolean) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
  // getState: () => IAppState
) => {
  // const payload = open === undefined ? getState().open : open

  dispatch({
    type: TOGGLE_ADD_TORRENT_DIALOG,
    payload: open,
  });
};
