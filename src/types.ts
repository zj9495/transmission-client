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
}

export type ITorrents = ITorrent[];

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
  allTorrents: ITorrents;
  session: ISession;
  menuOpen: boolean;
  selectedIds: number[];
  stats: IStats;
}

export interface IStatusColor {
  [propName: number]: "primary" | "disabled";
}

export interface IAppState {
  open: false;
}

export interface IAppState {
  rpc: IRPCState;
  app: IAppState;
}
