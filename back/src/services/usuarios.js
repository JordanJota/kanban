const db = require('../configs');
const sql = require('../queries/usuarios');

const listar = () => db.query(sql.listar);

const criar = ({ nome, email }) => db.get(sql.criar, { nome, email });

const atualizar = (id, { nome, email }) => db.get(sql.atualizar, { id, nome, email });

const remover = (id) => db.run(sql.remover, { id }).changes > 0;

module.exports = { listar, criar, atualizar, remover };
