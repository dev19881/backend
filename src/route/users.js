const Router = require('koa-router');
const knex = require('../db');
const auth = require('../middleware/auth');

const router = new Router({ prefix: '/v1/users' });

router.get('/', auth(), async (ctx) => {
  const content = await knex('users')
    .select('uuid', 'username', 'name')
    .orderBy('created_at');

  ctx.body = {
    status: 'success',
    content,
  };

  return ctx;
});

router.get('/:uuid', auth(), async (ctx) => {
  const user = await knex('users')
    .where({ uuid: ctx.params.uuid })
    .first('id', 'uuid', 'username', 'name');

  if (user === undefined) {
    return ctx.throw(404);
  }

  ctx.body = {
    status: 'success',
    content: {
      ...user,
      id: undefined, // id property should not be exposed
      properties: await knex('properties')
        .select('uuid', 'address')
        .where({
          user_id: user.id,
        }),
    },
  };

  return ctx;
});

module.exports = router;
