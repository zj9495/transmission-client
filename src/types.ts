export interface ITorrent {
  name: string;
  totalSize: number;
  downloadedEver: number;
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