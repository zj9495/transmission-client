export interface ITorrent {
  id: number;
  name: string;
  totalSize: number;
  downloadedEver: number;
  leftUntilDone: number;
  percentDone: number;
  rateUpload: number;
  rateDownload: number;
  uploadedEver: number;
  status: number;
  uploadRatio: number;
  seederCount: string;
  leecherCount: string;
  completeSize: number;
  addedDate: number;
  trackers: string;
  downloadDir: string;
  labels: string[];
  doneDate: number;
  queuePosition: number;
  activityDate: number;
  error: number;
  errorString: string;
  hashString: string;
}

export interface ITorrents {
  all: ITorrent[];
  downloading: ITorrent[];
  downloadWaiting: ITorrent[];
  paused: ITorrent[];
  active: ITorrent[];
  seeding: ITorrent[];
  seedWaiting: ITorrent[];
  checking: ITorrent[];
  checkWaiting: ITorrent[];
  warning: ITorrent[];
  error: ITorrent[];
}

export interface IUnits {
  memoryBytes?: number;
  memoryUnits?: string[];
  sizeBytes: number;
  sizeUnits: string[];
  speedBytes: number;
  speedUnits: string[];
}

export interface ISession {
  units: IUnits;
  downloadDirFreeSpace: number;
  version: string;
  rpcVersion: number;
  downloadDir: string;
}

export interface IStats {
  activeTorrentCount: number;
  downloadSpeed: number;
  pausedTorrentCount: number;
  torrentCount: number;
  uploadSpeed: number;
}

export interface IRPCState {
  locale: string;
  theme: "light" | "dark" | "auto";
  sessionId: string | undefined;
  torrents: ITorrents;
  session: ISession;
  menuOpen: boolean;
  selectedIds: number[];
  stats: IStats;
}

export interface IStatusColor {
  [propName: number]: "primary" | "disabled";
}

export interface IMessageConfig {
  key?: number;
  open: boolean;
  loading: boolean;
  message: React.ReactNode;
  severity: "error" | "info" | "success" | "warning";
}

export interface IAppState {
  open: boolean;
  messageConfig: IMessageConfig;
}

export interface IState {
  rpc: IRPCState;
  app: IAppState;
}

export type TorrentStatus =
  | "all"
  | "downloading"
  | "downloadWaiting"
  | "paused"
  | "active"
  | "seeding"
  | "seedWaiting"
  | "checking"
  | "checkWaiting"
  | "warning"
  | "error";

export interface IParamTypes {
  torrentStatus: TorrentStatus;
}
