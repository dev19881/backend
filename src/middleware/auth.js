const { UserModel } = require('../model/user.model')

const headers = {
  'WWW-Authenticate': 'Basic realm="Restricted Area", charset="UTF-8"'
}

module.exports.auth = () => async (ctx, next) => {
  const { authorization } = ctx.headers
  
  const origin = ctx.get('Origin');
  console.log('ctx method ' + ctx.method);
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
  
  if (authorization === undefined) {
    return ctx.throw(401, undefined, { headers })
  }

  const [, base64] = authorization.split(' ')
  const [username, password] = Buffer.from(base64, 'base64').toString().split(':')

  const user = await UserModel.query()
    .where({ username, password })
    .first()

  if (user === undefined) {
    return ctx.throw(401, undefined, { headers })
  }

  ctx.state.user = user

  return next()
}
