const db = require('../configs');
const sql = require('../queries/colunas');

const buscar = (id) => db.get(sql.buscar, { id });

const criar = (quadroId, { nome }) =>
  db.transaction(() => {
    const coluna = db.get(sql.criar, { quadro_id: quadroId, nome });
    db.run(sql.empurrarFim, { quadro_id: quadroId });
    return coluna;
  });

const atualizar = (id, { nome }) => db.get(sql.atualizar, { id, nome });

const mover = (coluna, { posicao }) =>
  db.transaction(() => {
    const ids = db.query(sql.outras, { quadro_id: coluna.quadro_id, id: coluna.id }).map((outra) => outra.id);
    ids.splice(Math.max(1, Math.min(posicao, ids.length - 1)), 0, coluna.id);
    ids.forEach((id, indice) => db.run(sql.posicionar, { id, posicao: indice }));
    return buscar(coluna.id);
  });

const remover = (coluna) =>
  db.transaction(() => {
    const inicio = db.get(sql.inicio, { quadro_id: coluna.quadro_id });
    db.run(sql.moverTarefas, { origem: coluna.id, destino: inicio.id });
    db.run(sql.remover, { id: coluna.id });
  });

module.exports = { buscar, criar, atualizar, mover, remover };
