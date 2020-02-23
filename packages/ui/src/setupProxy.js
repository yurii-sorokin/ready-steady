/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    proxy('/ready-steady-release/**', {
      target: 'http://localhost:5000/',
      changeOrigin: true
    })
  );
};
