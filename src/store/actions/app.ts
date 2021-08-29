/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
  SET_LOCALE,
  CHANGE_THEME,
  TOGGLE_REMOVE_TORRENTS_DIALOG,
} from "src/store/constants/app";
import { getRemoveTorrentsDialogOpen } from "src/store/selector/app";
import { IState, Theme } from "src/types";

export const setLocale = (val: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: SET_LOCALE,
    payload: val,
  });
};

export const toggleTheme = (theme?: Theme) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IState
) => {
  const nextThemeMap: Record<Theme, Theme> = {
    light: "dark",
    dark: "auto",
    auto: "light",
  };
  const state = getState();
  const currentTheme: Theme = state.app.theme;
  const nextTheme: Theme = theme || nextThemeMap[currentTheme];
  dispatch({
    type: CHANGE_THEME,
    payload: nextTheme,
  });
};

export const toggleRemoveTorrentsDialog = (open?: boolean) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IState
) => {
  const payload =
    open === undefined ? getRemoveTorrentsDialogOpen(getState()) : open;

  dispatch({
    type: TOGGLE_REMOVE_TORRENTS_DIALOG,
    payload,
  });
};
