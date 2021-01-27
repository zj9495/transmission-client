import produce from "immer";

import { TOGGLE_ADD_TORRENT_DIALOG } from "../constants";

export interface Action {
  type: string;
  payload: any;
}

export interface State {
  open: boolean;
}

const initialAddState: State = {
  open: false,
};

export default (state = initialAddState, action: Action) =>
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
