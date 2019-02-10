const Koa = require('koa')
const Router = require('koa-router')
const { knex } = require('./db')
const { Model } = require('objection')

const { ssl } = require('./middleware/ssl')
const { error } = require('./middleware/error')

const { index } = require('./route/index')
const { auth } = require('./route/auth')
const { me } = require('./route/me')
const { teapot } = require('./route/teapot')

const { PORT = 3000 } = process.env
const app = new Koa()

//const cors = require('@koa/cors');

//app.use(cors());

// cors middleware
app.use(async (ctx, next) => {
    const origin = ctx.get('Origin');
    if (ctx.method !== 'OPTIONS') {
      ctx.set('Access-Control-Allow-Origin', origin);
      ctx.set('Access-Control-Allow-Credentials', 'true');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    } else if (ctx.get('Access-Control-Request-Method')) {
      ctx.set('Access-Control-Allow-Origin', origin);
      ctx.set('Access-Control-Allow-Methods', 'GET');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type');
      ctx.set('Access-Control-Max-Age', '42');
      ctx.set('Access-Control-Allow-Credentials', 'true');
    }
    await next();
  });

Model.knex(knex)

app.use(ssl)
app.use(error) // then we handle other errors

// eslint-disable-next-line no-console
app.on('error', error => console.error(error.stack))

const router = new Router({ prefix: '/v1' })

router.use(auth.routes())

router.use(me.routes())
router.use(teapot.routes())

app.use(index.routes()) // root redirect
app.use(router.routes())

module.exports = app.listen(PORT)
