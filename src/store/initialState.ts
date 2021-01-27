import { IState } from "../types";

import { initialAppState } from "./reducers/app";
import { initialRPCState } from "./reducers/rpc";

const initialState: IState = {
  app: initialAppState,
  rpc: initialRPCState,
};

export default initialState;
