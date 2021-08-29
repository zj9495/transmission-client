import produce from "immer";

import { IAppState } from "src/types";
import {
  SET_LOCALE,
  CHANGE_THEME,
  TOGGLE_REMOVE_TORRENTS_DIALOG,
} from "src/store/constants/app";

export interface Action {
  type: string;
  payload: any;
}

export const initialAppState: IAppState = {
  removeTorrents: {
    open: false,
  },
  locale: "",
  theme: "auto",
};

export default (state = initialAppState, action: Action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCALE:
        draft.locale = action.payload;
        break;
      case CHANGE_THEME:
        draft.theme = action.payload;
        break;
      case TOGGLE_REMOVE_TORRENTS_DIALOG:
        draft.removeTorrents.open = action.payload;
        break;
      default:
        return state;
    }
  });
