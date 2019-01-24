const Koa = require('koa')
const Router = require('koa-router')
const knex = require('./db')
const { Model } = require('objection')

const { PORT = 3000 } = process.env
const app = new Koa()
const router = new Router({ prefix: '/v1' })

Model.knex(knex)

app.use(require('./middleware/ssl'))
app.use(require('./middleware/error')) // then we handle other errors
app.use(require('./route/index').routes()) // root redirect

// eslint-disable-next-line no-console
app.on('error', error => console.error(error.stack))

router.use(require('./route/auth').routes())

router.use(require('./route/me').routes())
router.use(require('./route/teapot').routes())

app.use(router.routes())

module.exports = app.listen(PORT)
