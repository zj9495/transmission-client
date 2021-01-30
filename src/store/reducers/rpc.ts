import produce from "immer";

import {
  SET_LOCALE,
  CHANGE_THEME,
  SET_SESSION_ID,
  SET_TORRENTS,
  SET_SESSION,
  TOGGLE_MENUOPEN,
  SET_SELECTED_IDS,
  SET_SESSION_STATS,
} from "../constants";
import { IRPCState } from "../../types";

export const initialRPCState: IRPCState = {
  locale: "zh-CN",
  theme: "light",
  sessionId: undefined,
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
  session: {
    units: {
      memoryBytes: 1024,
      memoryUnits: [],
      sizeBytes: 1000,
      sizeUnits: ["kB", "MB", "GB", "TB"],
      speedBytes: 1000,
      speedUnits: ["kB/s", "MB/s", "GB/s", "TB/s"],
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

export default (state = initialRPCState, action: Action) =>
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
      case SET_TORRENTS:
        draft.torrents = action.payload;
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
