import produce from "immer";

import { TOGGLE_INPUT_LINK_DIALOG } from "../constants";

export interface Action {
  type: string;
  payload: any;
}

export interface State {
  show: boolean;
}

const initialAddState: State = {
  show: false,
};

export default (state = initialAddState, action: Action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_INPUT_LINK_DIALOG:
        draft.show = action.payload;
        break;
      default:
        return state;
    }
  });
