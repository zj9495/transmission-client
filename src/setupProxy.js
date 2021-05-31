/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyDelay = function (req, res, next) {
  const isLocalhost = /localhost|127.0.0.1/.test(
    process.env.REACT_APP_TRANSMISSION_RPC
  );
  if (process.env.CI && isLocalhost) {
    // Delay request by 0.1 seconds
    setTimeout(next, 100);
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
