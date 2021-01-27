import produce from "immer";

import {
  SET_LOCALE,
  CHANGE_THEME,
  SET_SESSION_ID,
  SET_ALL_TORRENTS,
  SET_SESSION,
  TOGGLE_MENUOPEN,
  SET_SELECTED_IDS,
  SET_SESSION_STATS,
} from "../constants";
import { IRPCState } from "../../types";

const initialState: IRPCState = {
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
    downloadDirFreeSpace: 0,
    version: "",
    rpcVersion: 0,
  },
  stats: {
    activeTorrentCount: 0,
    downloadSpeed: 0,
    pausedTorrentCount: 0,
    torrentCount: 0,
    uploadSpeed: 0,
  },
  menuOpen: false,
  selectedIds: [],
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
      case SET_SELECTED_IDS:
        draft.selectedIds = action.payload;
        break;
      case SET_SESSION_STATS:
        draft.stats = action.payload;
        break;
      default:
        return state;
    }
  });
