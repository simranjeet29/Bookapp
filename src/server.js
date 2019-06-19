const exp = require('express');
const path = require('path');

const app = exp();

function serve() {
  app.use(exp.static(path.join(__dirname, '/')));
  app.listen(8876);
}
module.exports = {
  serve,
};
