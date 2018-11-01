const { DATABASE_URL } = process.env

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: 'db.sqlite'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: DATABASE_URL
  }
}
