import produce from "immer";

import {
  SET_LOCALE,
  CHANGE_THEME,
  SET_SESSION_ID,
  SET_ALL_TORRENTS,
  SET_SESSION,
  TOGGLE_MENUOPEN,
} from "../constants";
import { IAppState } from "../../types";

const initialState: IAppState = {
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
      speedUnits: []
    }
  },
  menuOpen: true
};

export interface Action {
  type: string;
  payload: any;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: Action) =>
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
