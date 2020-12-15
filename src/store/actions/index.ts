import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { SET_LOCALE, CHANGE_THEME, SET_SESSION_ID, SET_ALL_TORRENTS } from '../constants';
import { IAppState } from '../reducers';
import { getSessionId, getAllTorrents } from '../../api';
import request from '../../api/request';

// eslint-disable-next-line import/prefer-default-export
export const setLocale = (val: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
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
  const payload = state.theme === 'light' ? 'dark' : 'light';
  dispatch({
    type: CHANGE_THEME,
    payload,
  });
};

export const getSessionIdAction = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  return getSessionId().catch(err => {
    if (err.response.status === 409) {
      const sessionId = err.response.headers["x-transmission-session-id"]
      request.defaults.headers.common["x-transmission-session-id"] = sessionId;
      dispatch({
        type: SET_SESSION_ID,
        payload: sessionId
      });
    }
  })
}

export const getAllTorrentsAction = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  return getAllTorrents().then((res: any) => {
    dispatch({
      type: SET_ALL_TORRENTS,
      payload: res.data.arguments.torrents,
    })
  })
}
