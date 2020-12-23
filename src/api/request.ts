import axios from 'axios';

const request = axios.create({
  baseURL: `${process.env.REACT_APP_}/transmission/rpc`,
  withCredentials: true
});

export default request;