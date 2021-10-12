/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { getSession, getSessionStats } from "src/api";
import { SET_SESSION, SET_SESSION_STATS } from "src/store/constants/session";

export const getSessionAction = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const setSession = () =>
    getSession().then((res) => {
      dispatch({
        type: SET_SESSION,
        payload: res,
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
      payload: res.data.arguments,
    });
  });
