import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { SET_LOCALE, CHANGE_THEME, SET_ALL_TORRENTS, SET_SESSION } from '../constants';
import { IAppState } from '../../types';
import { getSession, getAllTorrents } from '../../api';
import { objectToCamelCase } from '../../utils/object'

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

export const getSessionAction = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  const setSession = () => getSession().then(res => {
    dispatch({
      type: SET_SESSION,
      payload: objectToCamelCase(res.data.arguments)
    })
  })
  return setSession().catch(() => {
    setSession()
  })
}

export const getAllTorrentsAction = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  return getAllTorrents().then((res) => {
    dispatch({
      type: SET_ALL_TORRENTS,
      payload: res.data.arguments.torrents,
    })
  })
}
