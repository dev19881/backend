const Router = require('koa-router');

const router = new Router();

router.get('/', ctx => ctx.redirect('v1'));
router.get('/v1', ctx => ctx);

module.exports = router;
