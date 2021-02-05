import produce from "immer";

import { IAppState } from "src/types";
import { TOGGLE_ADD_TORRENT_DIALOG, SET_MESSAGE_BAR } from "../constants";

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
      default:
        return state;
    }
  });
