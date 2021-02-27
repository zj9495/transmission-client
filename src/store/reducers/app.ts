import produce from "immer";

import { IAppState } from "src/types";
import {
  TOGGLE_ADD_TORRENT_DIALOG,
  SET_MESSAGE_BAR,
  TOGGLE_REMOVE_TORRENTS_DIALOG,
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
      case TOGGLE_REMOVE_TORRENTS_DIALOG:
        draft.removeTorrents.open = action.payload;
        break;
      default:
        return state;
    }
  });
