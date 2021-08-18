export type TorrentId = number;

export type TrackerStats = {
  announce: string;
  announceState: 0 | 1;
  downloadCount: number;
  hasAnnounced: false;
  hasScraped: true;
  host: string;
  id: number;
  isBackup: boolean;
  lastAnnouncePeerCount: number;
  lastAnnounceResult: string;
  lastAnnounceStartTime: number;
  lastAnnounceSucceeded: boolean;
  lastAnnounceTime: number;
  lastAnnounceTimedOut: boolean;
  lastScrapeResult: string;
  lastScrapeStartTime: number;
  lastScrapeSucceeded: boolean;
  lastScrapeTime: number;
  lastScrapeTimedOut: boolean;
  leecherCount: number;
  nextAnnounceTime: number;
  nextScrapeTime: number;
  scrape: string;
  scrapeState: 0 | 1;
  seederCount: number;
  tier: 0 | 1;
}[];

export type OriginTorrentSettings = {
  downloadLimit: number;
  downloadLimited: boolean;
  "peer-limit": number;
  seedIdleLimit: number;
  seedIdleMode: number;
  seedRatioLimit: number;
  seedRatioMode: number;
  uploadLimit: number;
  uploadLimited: boolean;
};

export type TorrentSettings = Omit<OriginTorrentSettings, "peer-limit"> & {
  peerLimit: number;
};

export interface ITorrent {
  id: TorrentId;
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
  seederCount: number;
  leecherCount: number;
  peersGettingFromUs: number;
  peersSendingToUs: number;
  recheckProgress: number;
  completeSize: number;
  addedDate: number;
  trackers: [];
  trackerStats: [];
  downloadDir: string;
  labels: string[];
  doneDate: number;
  queuePosition: number;
  activityDate: number;
  error: number;
  errorString: string;
  hashString: string;
  magnetLink: string;
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
  id: TorrentId;
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
  addedDate: number;
  doneDate: number;
  percentDone: number;
  peersGettingFromUs: number;
  peersSendingToUs: number;
  seederCount: number;
  leecherCount: number;
  activityDate: number;
  dateCreated: number;
  comment: string;
  trackerStats: TrackerStats;
  peers: {
    address: string;
    clientIsChoked: boolean;
    clientIsInterested: boolean;
    clientName: string;
    flagStr: string;
    isDownloadingFrom: boolean;
    isEncrypted: boolean;
    isIncoming: boolean;
    isUTP: boolean;
    isUploadingTo: boolean;
    peerIsChoked: boolean;
    peerIsInterested: boolean;
    port: number;
    progress: number;
    rateToClient: number;
    rateToPeer: number;
  }[];
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
  id: TorrentId | null;
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

export type IAppState = {
  open: boolean;
  messageConfig: IMessageConfig;
  torrentDownloadOptions: ITorrentDownloadOptions;
  removeTorrents: RemoveTorrents;
  detail: {
    open: boolean;
    id: TorrentId | null;
  };
};

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

export type QueueType = "top" | "up" | "down" | "bottom";
