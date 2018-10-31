const { Model } = require('objection');
const BaseModel = require('./BaseModel');

class PropertyModel extends BaseModel {
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        address: { type: 'string' },
        created_at: { type: 'date-time' },
        updated_at: { type: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const UserModel = require('./UserModel');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'properties.user_id',
          to: 'users.id',
        },
      },
    };
  }

  static tableName() {
    return 'properties';
  }

  $formatJson(json) {
    return {
      ...super.$formatJson(json),
      user_id: undefined,
    };
  }
}

module.exports = PropertyModel;