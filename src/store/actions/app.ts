/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
  TOGGLE_ADD_TORRENT_DIALOG,
  SET_MESSAGE_BAR,
  TOGGLE_REMOVE_TORRENTS_DIALOG,
} from "src/store/constants";
import { IMessageConfig, IState } from "src/types";

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
