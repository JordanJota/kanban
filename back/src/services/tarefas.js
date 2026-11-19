const db = require('../configs');
const sql = require('../queries/tarefas');

const hoje = () => db.get(sql.hoje).hoje;

const buscar = (id) => db.get(sql.buscar, { id });

const criar = (coluna, { titulo, descricao, prioridade, prazo, responsavel_id }) =>
  db.get(sql.criar, {
    coluna_id: coluna.id,
    titulo,
    descricao,
    prioridade,
    prazo,
    responsavel_id,
    concluido_em: coluna.tipo === 'fim' ? hoje() : null
  });

const atualizar = (id, { titulo, descricao, prioridade, prazo, responsavel_id }) =>
  db.get(sql.atualizar, { id, titulo, descricao, prioridade, prazo, responsavel_id });

const mover = (tarefa, destino) =>
  db.get(sql.mover, {
    id: tarefa.id,
    coluna_id: destino.id,
    concluido_em: destino.tipo === 'fim' ? (tarefa.concluido_em ?? hoje()) : null
  });

const remover = (id) => db.run(sql.remover, { id }).changes > 0;

module.exports = { buscar, criar, atualizar, mover, remover };
