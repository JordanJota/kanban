const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const arquivo = path.resolve(__dirname, '..', '..', process.env.DB_PATH || 'data/kanban.db');
fs.mkdirSync(path.dirname(arquivo), { recursive: true });

const conexao = new DatabaseSync(arquivo);
conexao.exec('PRAGMA foreign_keys = ON');
conexao.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));

module.exports = {
  query: (sql, params = {}) => conexao.prepare(sql).all(params),
  get: (sql, params = {}) => conexao.prepare(sql).get(params),
  run: (sql, params = {}) => conexao.prepare(sql).run(params),

  transaction: (callback) => {
    conexao.exec('BEGIN');
    try {
      const resultado = callback();
      conexao.exec('COMMIT');
      return resultado;
    } catch (erro) {
      conexao.exec('ROLLBACK');
      throw erro;
    }
  }
};
