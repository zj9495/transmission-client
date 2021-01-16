import produce from "immer";

import {
  SET_LOCALE,
  CHANGE_THEME,
  SET_SESSION_ID,
  SET_ALL_TORRENTS,
  SET_SESSION,
  TOGGLE_MENUOPEN,
} from "../constants";
import { IRootState } from "../../types";

const initialState: IRootState = {
  locale: "zh-CN",
  theme: "light",
  sessionId: undefined,
  allTorrents: [],
  session: {
    units: {
      memoryBytes: 1024,
      memoryUnits: [],
      sizeBytes: 1000,
      sizeUnits: [],
      speedBytes: 1000,
      speedUnits: [],
    },
  },
  menuOpen: false,
};

export interface Action {
  type: string;
  payload: any;
}

export default (state = initialState, action: Action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCALE:
        draft.locale = action.payload;
        break;
      case CHANGE_THEME:
        draft.theme = action.payload;
        break;
      case SET_SESSION_ID:
        draft.sessionId = action.payload;
        break;
      case SET_ALL_TORRENTS:
        draft.allTorrents = action.payload;
        break;
      case SET_SESSION:
        draft.session = action.payload;
        break;
      case TOGGLE_MENUOPEN:
        draft.menuOpen = action.payload;
        break;
      default:
        return state;
    }
  });
