/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
  SET_LOCALE,
  CHANGE_THEME,
  SET_ALL_TORRENTS,
  SET_SESSION,
  TOGGLE_MENUOPEN,
  SET_SELECTED_IDS,
  SET_SESSION_STATS,
} from "../constants";
import { IAppState } from "../../types";
import { getSession, getAllTorrents, getSessionStats } from "../../api";
import { objectToCamelCase } from "../../utils/object";

export const setLocale = (val: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: SET_LOCALE,
    payload: val,
  });
};

export const toggleTheme = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IAppState
) => {
  const state = getState();
  const payload = state.rpc.theme === "light" ? "dark" : "light";
  dispatch({
    type: CHANGE_THEME,
    payload,
  });
};

export const getSessionAction = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const setSession = () =>
    getSession().then((res) => {
      dispatch({
        type: SET_SESSION,
        payload: objectToCamelCase(res.data.arguments),
      });
    });
  return setSession().catch(() => {
    setSession();
  });
};

export const getSessionStatsAction = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) =>
  getSessionStats().then((res) => {
    dispatch({
      type: SET_SESSION_STATS,
      payload: objectToCamelCase(res.data.arguments),
    });
  });
export const getAllTorrentsAction = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) =>
  getAllTorrents().then((res) => {
    dispatch({
      type: SET_ALL_TORRENTS,
      payload: res.data.arguments.torrents,
    });
  });

export const toggleMenuOpen = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IAppState
) => {
  const state = getState();
  const payload = !state.rpc.menuOpen;
  dispatch({
    type: TOGGLE_MENUOPEN,
    payload,
  });
};

export const setSelectedIds = (payload: number[]) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: SET_SELECTED_IDS,
    payload,
  });
};
