/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/transmission/rpc",
    createProxyMiddleware({
      target: process.env.REACT_APP_TRANSMISSION_RPC,
      changeOrigin: true,
    })
  );
};
