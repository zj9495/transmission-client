import produce from "immer";

import { MenuState } from "src/types";
import { TOGGLE_MENUOPEN } from "src/store/constants/menu";

export const initialMenuState: MenuState = {
  open: false,
};

export interface Action {
  type: string;
  payload: any;
}

export default (state = initialMenuState, action: Action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_MENUOPEN:
        draft.open = action.payload;
        break;
      default:
        return state;
    }
  });
