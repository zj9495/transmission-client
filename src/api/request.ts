import axios from 'axios';

const request = axios.create({
  baseURL: `${process.env.REACT_APP_TR_RPC_HOST}/transmission/rpc`,
  withCredentials: true
});

export default request;