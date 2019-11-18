const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  //using Sandbox
  // app.use(proxy('/vulcan', { target: 'http://aa.vulcan.mobetize.com', changeOrigin:true }));
  // app.use(proxy('/server', { target: 'http://auth.vulcan.mobetize.com' }));
  //using localhost
  //app.use(proxy('/server', { target: 'http://127.0.0.1:8080' }))
};
