import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rpcReducer from "./reducers/rpc";
import appReducer from "./reducers/app";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["rpc", "app"],
};

const rpcPersistConfig = {
  key: "rpc",
  storage,
  blacklist: ["session"],
};

const appPersistConfig = {
  key: "app",
  storage,
  blacklist: ["detail"],
};

const rootReducer = combineReducers({
  rpc: persistReducer(rpcPersistConfig, rpcReducer),
  app: persistReducer(appPersistConfig, appReducer),
});

export const reducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const persistor = persistStore(store);
export default store;
