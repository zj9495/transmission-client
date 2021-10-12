import produce from "immer";

import { SessionState } from "src/types";
import {
  SET_SESSION_ID,
  SET_SESSION,
  SET_SESSION_STATS,
} from "src/store/constants/session";

export const initialSessionState: SessionState = {
  connected: false,
  sessionId: undefined,
  session: {
    downloadDir: "",
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
    renamePartialFiles: false,
    startAddedTorrents: false,
    incompleteDirEnabled: false,
    incompleteDir: "",
    cacheSizeMb: 0,
    scriptTorrentDoneEnabled: false,
    scriptTorrentDoneFilename: "",
    configDir: "",
    downloadQueueEnabled: false,
    downloadQueueSize: 0,
    seedQueueEnabled: false,
    seedQueueSize: 0,
    peerPortRandomOnStart: false,
    peerPort: 0,
    blocklistEnabled: false,
    blocklistUrl: "",
    encryption: "",
    portForwardingEnabled: false,
    lpdEnabled: false,
    utpEnabled: false,
    dhtEnabled: false,
    pexEnabled: false,
    speedLimitDownEnabled: false,
    speedLimitDown: 0,
    speedLimitUpEnabled: false,
    speedLimitUp: 0,
    peerLimitGlobal: 0,
    peerLimitPerTorrent: 0,
    seedRatioLimited: false,
    seedRatioLimit: 0,
    idleSeedingLimitEnabled: false,
    idleSeedingLimit: 0,
    queueStalledEnabled: false,
    queueStalledMinutes: 0,
  },
  stats: {
    activeTorrentCount: 0,
    downloadSpeed: 0,
    pausedTorrentCount: 0,
    torrentCount: 0,
    uploadSpeed: 0,
  },
};

export interface Action {
  type: string;
  payload: any;
}

export default (state = initialSessionState, action: Action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SESSION_ID:
        draft.sessionId = action.payload;
        break;
      case SET_SESSION:
        draft.session = action.payload;
        break;
      case SET_SESSION_STATS:
        draft.stats = action.payload;
        draft.connected = true;
        break;
      default:
        return state;
    }
  });
