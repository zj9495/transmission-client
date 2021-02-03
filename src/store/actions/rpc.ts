/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { STATUS_TYPES } from "src/constants";
import { ITorrent, ITorrents, IState } from "src/types";

import { getSession, getTorrents, getSessionStats } from "src/api";
import { objectToCamelCase } from "src/utils/object";
import {
  SET_LOCALE,
  CHANGE_THEME,
  SET_TORRENTS,
  SET_SESSION,
  TOGGLE_MENUOPEN,
  SET_SELECTED_IDS,
  SET_SESSION_STATS,
} from "../constants";

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
  getState: () => IState
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
export const getTorrentsAction = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) =>
  getTorrents().then((res) => {
    const torrents: ITorrent[] = res.data.arguments.torrents || [];
    const payload: ITorrents = {
      all: torrents,
      downloading: torrents.filter(
        (item) => item.status === STATUS_TYPES.download
      ),
      downloadWaiting: torrents.filter(
        (item) => item.status === STATUS_TYPES.downloadwait
      ),
      paused: torrents.filter((item) => item.status === STATUS_TYPES.paused),
      active: torrents.filter((item) => item.rateDownload || item.rateUpload),
      seeding: torrents.filter((item) => item.status === STATUS_TYPES.seed),
      seedWaiting: torrents.filter(
        (item) => item.status === STATUS_TYPES.seedwait
      ),
      checking: torrents.filter((item) => item.status === STATUS_TYPES.check),
      checkWaiting: torrents.filter(
        (item) => item.status === STATUS_TYPES.checkwait
      ),
      warning: [],
      error: torrents.filter((item) => item.error),
    };

    dispatch({
      type: SET_TORRENTS,
      payload,
    });
  });

export const toggleMenuOpen = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IState
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
