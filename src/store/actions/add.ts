/* eslint-disable @typescript-eslint/ban-types */
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { TOGGLE_INPUT_LINK_DIALOG } from "../constants";
// import { IAppState } from "../../types";

export const toggleInputLinkDialog = (open?: boolean) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
  // getState: () => IAppState
) => {
  // const payload = open === undefined ? getState().open : open

  dispatch({
    type: TOGGLE_INPUT_LINK_DIALOG,
    payload: open,
  });
};
