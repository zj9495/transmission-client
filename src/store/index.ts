import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import addReducer from "./reducers/add";
import appReducer from "./reducers/app";
import detailReducer from "./reducers/detail";
import listReducer from "./reducers/list";
import menuReducer from "./reducers/menu";
import sessionReducer from "./reducers/session";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["session", "detail"],
};

const addPersistConfig = {
  key: "session",
  storage,
};

const appPersistConfig = {
  key: "app",
  storage,
};

const detailPersistConfig = {
  key: "detail",
  storage,
  blacklist: ["open"],
};

const listPersistConfig = {
  key: "list",
  storage,
};

const menuPersistConfig = {
  key: "menu",
  storage,
};

const sessionPersistConfig = {
  key: "session",
  storage,
  blacklist: ["session", "connected"],
};

const rootReducer = combineReducers({
  add: persistReducer(addPersistConfig, addReducer),
  app: persistReducer(appPersistConfig, appReducer),
  detail: persistReducer(detailPersistConfig, detailReducer),
  list: persistReducer(listPersistConfig, listReducer),
  menu: persistReducer(menuPersistConfig, menuReducer),
  session: persistReducer(sessionPersistConfig, sessionReducer),
});

export const reducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const persistor = persistStore(store);
export default store;
