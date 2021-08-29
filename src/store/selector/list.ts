import { IState } from "src/types";

export const getTorrents = (state: IState) => state.list.torrents;

export const getSelectedIds = (state: IState) => state.list.selectedIds;
export const getSelectedTorrents = (state: IState) =>
  state.list.torrents.all.filter((torrent) =>
    state.list.selectedIds.includes(torrent.id)
  );
