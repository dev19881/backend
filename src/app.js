const Koa = require('koa');

const { PORT = 3000 } = process.env;
const app = new Koa();

app.use(require('./middleware/ssl'));
app.use(require('./middleware/error'));

// eslint-disable-next-line no-console
app.on('error', error => console.error(error.stack));

app.use(require('./route/index').routes());
app.use(require('./route/users').routes());
app.use(require('./route/properties').routes());

app.use(require('./route/teapot').routes());

module.exports = app.listen(PORT);
