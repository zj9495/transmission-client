import { IState } from "src/types";

// Torrent Detail
export const getTorrentDetailOpen = (state: IState) => state.detail.open;
export const getDetailId = (state: IState) => state.detail.id;
