import axios from 'axios';

import store from '../store'
import { SET_SESSION_ID } from '../store/constants';

const request = axios.create({
  baseURL: `${process.env.REACT_APP_TR_RPC_HOST}/transmission/rpc`,
  withCredentials: true
});

request.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 409) {
    const sessionId = error.response.headers["x-transmission-session-id"]
    request.defaults.headers.common["x-transmission-session-id"] = sessionId;
    store.dispatch({
      type: SET_SESSION_ID,
      payload: sessionId
    });
  }
  return Promise.reject(error);
})

export default request;