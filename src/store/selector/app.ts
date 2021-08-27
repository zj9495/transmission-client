import { IState } from "src/types";

export const getLocale = (state: IState) => state.app.locale;
export const getTheme = (state: IState) => state.app.theme;

// Remove Torrents
export const getRemoveTorrentsDialogOpen = (state: IState) =>
  state.app.removeTorrents.open;
