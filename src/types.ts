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
}

export interface IRootState {
  locale: string;
  theme: "light" | "dark" | "auto";
  sessionId: string | undefined;
  allTorrents: ITorrents;
  session: ISession;
  menuOpen: boolean;
  selectedIds: number[];
}

export interface IStatusColor {
  [propName: number]: "primary" | "disabled";
}

export interface IAddState {
  open: false;
}

export interface IAppState {
  root: IRootState;
  add: IAddState;
}
