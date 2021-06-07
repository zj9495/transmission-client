/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyDelay = function (req, res, next) {
  const delay = Number(process.env.REACT_APP_RPC_DELAY);
  if (delay) {
    setTimeout(next, delay);
  } else {
    next();
  }
};
module.exports = function (app) {
  app.use(
    "/transmission/rpc",
    proxyDelay,
    createProxyMiddleware({
      target: process.env.REACT_APP_TRANSMISSION_RPC,
      changeOrigin: true,
    })
  );
};
