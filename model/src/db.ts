const connectDb = require('pg-promise')();

class Db {
  url = process.env.PURIST_DB || 'postgres://localhost:5432/purist';
  db = connectDb(this.url);
} export default new Db().db;
