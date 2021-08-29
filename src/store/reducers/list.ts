import produce from "immer";

import { ListState } from "src/types";
import { SET_TORRENTS, SET_SELECTED_IDS } from "src/store/constants/list";

export const initialListState: ListState = {
  torrents: {
    all: [],
    downloading: [],
    downloadWaiting: [],
    paused: [],
    active: [],
    seeding: [],
    seedWaiting: [],
    checking: [],
    checkWaiting: [],
    warning: [],
    error: [],
  },
  selectedIds: [],
};

export interface Action {
  type: string;
  payload: any;
}

export default (state = initialListState, action: Action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case SET_TORRENTS:
        draft.torrents = action.payload;
        break;
      case SET_SELECTED_IDS:
        draft.selectedIds = action.payload;
        break;
      default:
        return state;
    }
  });
