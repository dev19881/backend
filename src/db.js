const { NODE_ENV = 'development' } = process.env
const { Model } = require('objection')

const knex = require('knex')(require('../knexfile')[NODE_ENV])

Model.knex(knex)

module.exports = knex
