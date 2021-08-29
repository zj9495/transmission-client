/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { TOGGLE_MENUOPEN } from "src/store/constants/menu";
import { IState } from "src/types";

export const toggleMenuOpen = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IState
) => {
  const state = getState();
  const payload = !state.menu.open;
  dispatch({
    type: TOGGLE_MENUOPEN,
    payload,
  });
};
