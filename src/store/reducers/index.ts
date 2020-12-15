import produce from 'immer';

import { SET_LOCALE, CHANGE_THEME, SET_SESSION_ID, SET_ALL_TORRENTS } from '../constants';

export interface IAppState {
  locale: string;
  theme: "light" | "dark";
  sessionId: string | undefined;
  allTorrents: Array<object>;
}

const initialState: IAppState = {
  locale: 'zh-CN',
  theme: 'light',
  sessionId: undefined,
  allTorrents: [],
};

export interface Action {
  type: string;
  payload: any;
}

export default (state = initialState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCALE:
        draft.locale = action.payload;
        break;
      case CHANGE_THEME:
        draft.theme = action.payload;
        break;
        case SET_SESSION_ID:
          draft.sessionId = action.payload;
          break;
          case SET_ALL_TORRENTS:
            draft.allTorrents = action.payload;
            break;
      default:
        return state;
    }
  });
