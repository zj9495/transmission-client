export interface ITorrent {
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
}

export type ITorrents = ITorrent[]

export interface IUnits {
  memoryBytes?: number;
  memoryUnits?: string[];
  sizeBytes: number;
  sizeUnits: string[];
  speedBytes: number;
  speedUnits: string[];
}

export interface ISession {
  units: IUnits
}

export interface IAppState {
  locale: string;
  theme: "light" | "dark" | "auto";
  sessionId: string | undefined;
  allTorrents: ITorrents;
  session: ISession;
}

export interface IStatusColor {
  [propName: number]: 'primary'|'disabled';
}