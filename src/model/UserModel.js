const { Model } = require('objection')
const BaseModel = require('./BaseModel')

class UserModel extends BaseModel {
  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string' },
        created_at: { type: 'date-time' },
        updated_at: { type: 'date-time' }
      }
    }
  }

  static get relationMappings () {
    const PropertyModel = require('./PropertyModel')

    return {
      properties: {
        relation: Model.HasManyRelation,
        modelClass: PropertyModel,
        join: {
          from: 'users.id',
          to: 'properties.user_id'
        }
      }
    }
  }

  static tableName () {
    return 'users'
  }

  $formatJson (json) {
    return {
      ...super.$formatJson(json),
      password: undefined
    }
  }
}

module.exports = UserModel
