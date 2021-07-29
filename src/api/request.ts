import axios, { AxiosResponse } from "axios";

import store from "src/store";
import { SET_SESSION_ID } from "src/store/constants";
import { objectToCamelCase } from "src/utils/object";

const request = axios.create({
  baseURL: "/transmission/rpc",
  withCredentials: true,
});

request.interceptors.request.use((req) => {
  req.headers["x-transmission-rpc-method"] =
    req.data.method || "unknown-method";
  return req;
});

request.interceptors.response.use(
  (response) => objectToCamelCase(response) as AxiosResponse<any>,
  (error) => {
    if (error.response.status === 409) {
      const sessionId = error.response.headers["x-transmission-session-id"];
      request.defaults.headers.common["x-transmission-session-id"] = sessionId;
      store.dispatch({
        type: SET_SESSION_ID,
        payload: sessionId,
      });
    }
    return Promise.reject(error);
  }
);

export default request;
