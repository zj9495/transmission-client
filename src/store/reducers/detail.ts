import produce from "immer";

import { DetailState } from "src/types";
import {
  SHOW_TORRENT_DETAIL,
  HIDE_TORRENT_DETAIL,
} from "src/store/constants/detail";

export interface Action {
  type: string;
  payload: any;
}

export const initialDetailState: DetailState = {
  open: false,
  id: null,
};

export default (state = initialDetailState, action: Action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case SHOW_TORRENT_DETAIL:
        draft.open = true;
        draft.id = action.payload.id;
        break;
      case HIDE_TORRENT_DETAIL:
        draft.open = false;
        break;
      default:
        return state;
    }
  });
