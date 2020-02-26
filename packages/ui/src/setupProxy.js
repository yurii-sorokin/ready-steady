/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const proxy = require('http-proxy-middleware');

module.exports = app => {
  if (process.env.REACT_APP_HOST === 'zeit') {
    app.use(
      proxy('/api/**', {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        pathRewrite: { '^/api': '/' }
      })
    );
  } else {
    app.use(
      proxy('/ready-steady-release/**', {
        target: 'http://localhost:5000/',
        changeOrigin: true
      })
    );
  }
};
