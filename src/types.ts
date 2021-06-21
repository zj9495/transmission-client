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

export type Theme = "light" | "dark" | "auto";

export interface IRPCState {
  locale:
    | "en"
    | "zh-CN"
    | "zh-TW"
    | "de"
    | "es"
    | "fr"
    | "hu"
    | "it"
    | "ko"
    | "nl"
    | "pl"
    | "pt-BR"
    | "pt-PT"
    | "ro"
    | "ru"
    | "uk"
    | "";
  theme: Theme;
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

export type Torrent = {
  bandwidthPriority: number;
  downloadDir: string;
  downloadLimit: number;
  downloadLimited: boolean;
  fileStats: {
    bytesCompleted: number;
    priority: -1 | 0 | 1;
    wanted: boolean;
  }[];
  files: {
    bytesCompleted: number;
    length: number;
    name: string;
  }[];
  hashString: string;
  id: number;
  isPrivate: boolean;
  labels: string[];
  magnetLink: string;
  metadataPercentComplete: number;
  name: string;
  peerLimit: number;
  queuePosition: number;
  seedIdleLimit: number;
  seedIdleMode: number;
  seedRatioLimit: number;
  seedRatioMode: number;
  status: number;
  totalSize: number;
  uploadLimit: number;
  uploadLimited: boolean;
  wanted: (0 | 1)[];
};

export type TFile = {
  id: number;
  bytesCompleted: number;
  length: number;
  name: string;
  priority: -1 | 0 | 1;
  wanted: boolean;
  percentDone: number;
  fileFormat: string;
};

export interface ITorrentDownloadOptions {
  id: number | null;
  open: boolean;
  freeDiskSpace: number;
  info: Torrent | null;
  files: TFile[];
  selectedFilesIds: number[];
  selectedFiles: TFile[];
}

type RemoveTorrents = {
  open: boolean;
};

export interface IAppState {
  open: boolean;
  messageConfig: IMessageConfig;
  torrentDownloadOptions: ITorrentDownloadOptions;
  removeTorrents: RemoveTorrents;
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
