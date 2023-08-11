const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.yelp.com/v3',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
};