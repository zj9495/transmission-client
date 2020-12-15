import axios from 'axios';

const request = axios.create({
  baseURL: '/transmission/rpc',
});

export default request;