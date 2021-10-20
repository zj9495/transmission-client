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
  renamePartialFiles: boolean;
  startAddedTorrents: boolean;
  incompleteDirEnabled: boolean;
  incompleteDir: string;
  cacheSizeMb: number;
  scriptTorrentDoneEnabled: boolean;
  scriptTorrentDoneFilename: string;
  configDir: string;
  downloadQueueEnabled: boolean;
  downloadQueueSize: number;
  seedQueueEnabled: boolean;
  seedQueueSize: number;
  peerPortRandomOnStart: boolean;
  peerPort: number;
  blocklistEnabled: boolean;
  blocklistUrl: string;
  blocklistSize: number;
  encryption: string;
  portForwardingEnabled: boolean;
  lpdEnabled: boolean;
  utpEnabled: boolean;
  dhtEnabled: boolean;
  pexEnabled: boolean;
  speedLimitDownEnabled: boolean;
  speedLimitDown: number;
  speedLimitUpEnabled: boolean;
  speedLimitUp: number;
  peerLimitGlobal: number;
  peerLimitPerTorrent: number;
  seedRatioLimited: boolean;
  seedRatioLimit: number;
  idleSeedingLimitEnabled: boolean;
  idleSeedingLimit: number;
  queueStalledEnabled: boolean;
  queueStalledMinutes: number;
}

export interface IStats {
  activeTorrentCount: number;
  downloadSpeed: number;
  pausedTorrentCount: number;
  torrentCount: number;
  uploadSpeed: number;
}

export type Theme = "light" | "dark" | "auto";

export interface SessionState {
  connected: boolean;
  sessionId: string | undefined;
  session: ISession;
  stats: IStats;
}

export interface IStatusColor {
  [propName: number]: "primary" | "disabled";
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
  removeTorrents: RemoveTorrents;
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
};

export type DetailState = {
  open: boolean;
  id: TorrentId | null;
};

export type ListState = {
  torrents: ITorrents;
  selectedIds: TorrentId[];
};

export type MenuState = {
  open: boolean;
};

export type AddState = {
  open: boolean;
  torrentDownloadOptions: ITorrentDownloadOptions;
};

export interface IState {
  add: AddState;
  app: IAppState;
  detail: DetailState;
  list: ListState;
  menu: MenuState;
  session: SessionState;
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

export type SessionFormData = Pick<
  ISession,
  | "renamePartialFiles"
  | "startAddedTorrents"
  | "downloadDir"
  | "incompleteDirEnabled"
  | "incompleteDir"
  | "cacheSizeMb"
  | "scriptTorrentDoneEnabled"
  | "scriptTorrentDoneFilename"
  | "configDir"
  | "downloadQueueEnabled"
  | "downloadQueueSize"
  | "seedQueueEnabled"
  | "seedQueueSize"
  | "peerPortRandomOnStart"
  | "peerPort"
  | "blocklistEnabled"
  | "blocklistUrl"
  | "encryption"
  | "portForwardingEnabled"
  | "lpdEnabled"
  | "utpEnabled"
  | "dhtEnabled"
  | "pexEnabled"
  | "speedLimitDownEnabled"
  | "speedLimitDown"
  | "speedLimitUpEnabled"
  | "speedLimitUp"
  | "peerLimitGlobal"
  | "peerLimitPerTorrent"
  | "seedRatioLimited"
  | "seedRatioLimit"
  | "idleSeedingLimitEnabled"
  | "idleSeedingLimit"
  | "queueStalledEnabled"
  | "queueStalledMinutes"
  | "blocklistSize"
>;
