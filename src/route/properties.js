const Router = require('koa-router');
const knex = require('../db');

const router = new Router({ prefix: '/properties' });

router.get('/', async (ctx) => {
  const { user } = ctx.state;

  const properties = await knex('properties')
    .select('id', 'address', 'created_at', 'updated_at')
    .where({ user_id: user.id })
    .orderBy('created_at');

  ctx.body = {
    status: 'success',
    content: properties,
  };

  return ctx;
});

router.put('/', async (ctx) => {
  ctx.throw(501);
});

router.get('/:propertyId', async (ctx) => {
  const { user } = ctx.state;
  const { propertyId } = ctx.params;

  const property = await knex('properties')
    .first('id', 'address', 'created_at', 'updated_at')
    .where({ user_id: user.id, id: propertyId });

  if (property === undefined) {
    return ctx.throw(404);
  }

  ctx.body = {
    status: 'success',
    content: property,
  };

  return ctx;
});

router.post('/:propertyId', async (ctx) => {
  ctx.throw(501);
});

module.exports = router;
