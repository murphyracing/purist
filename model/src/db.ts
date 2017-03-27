class Db {
  url = process.env.PURIST_DB || 'postgres://localhost:5432/purist';
}
export default new Db();
