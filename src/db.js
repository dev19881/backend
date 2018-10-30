const { NODE_ENV = 'development' } = process.env;

module.exports = require('knex')(require('../knexfile')[NODE_ENV]);
