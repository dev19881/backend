const Router = require('koa-router');

const router = new Router({ prefix: '/v1/teapot' });

router.get('/', ctx => ctx.throw(418, undefined, { expose: false }));

module.exports = router;
