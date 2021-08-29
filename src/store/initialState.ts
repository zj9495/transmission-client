import { IState } from "src/types";

import { initialAddState } from "./reducers/add";
import { initialAppState } from "./reducers/app";
import { initialDetailState } from "./reducers/detail";
import { initialListState } from "./reducers/list";
import { initialMenuState } from "./reducers/menu";
import { initialSessionState } from "./reducers/session";

const initialState: IState = {
  add: initialAddState,
  app: initialAppState,
  detail: initialDetailState,
  list: initialListState,
  menu: initialMenuState,
  session: initialSessionState,
};

export default initialState;
