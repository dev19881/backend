const Router = require('koa-router');
const knex = require('../db');
const auth = require('../middleware/auth');

const router = new Router({ prefix: '/v1/properties' });

router.get('/', auth(), async (ctx) => {
  const content = await knex('properties')
    .select('uuid', 'address')
    .orderBy('created_at');

  ctx.body = {
    status: 'success',
    content,
  };

  return ctx;
});

router.get('/:uuid', auth(), async (ctx) => {
  const property = await knex('properties')
    .where({ uuid: ctx.params.uuid })
    .first('uuid', 'address', 'user_id');

  if (property === undefined) {
    return ctx.throw(404);
  }

  const user = property.user_id
    ? await knex('users')
      .where({ id: property.user_id })
      .first('uuid', 'username', 'name')
    : undefined;

  ctx.body = {
    status: 'success',
    content: {
      ...property,
      user_id: undefined, // user id should not be exposed
      user,
    },
  };

  return ctx;
});

module.exports = router;
