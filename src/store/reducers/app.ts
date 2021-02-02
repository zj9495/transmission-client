import produce from "immer";

import { TOGGLE_ADD_TORRENT_DIALOG } from "../constants";
import { IAppState } from "../../types";

export interface Action {
  type: string;
  payload: any;
}

export const initialAppState: IAppState = {
  open: false,
};

export default (state = initialAppState, action: Action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_ADD_TORRENT_DIALOG:
        draft.open = action.payload;
        break;
      default:
        return state;
    }
  });