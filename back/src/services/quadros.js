const db = require('../configs');
const sql = require('../queries/quadros');

const COLUNAS_PADRAO = [
  { nome: 'A fazer', tipo: 'inicio' },
  { nome: 'Em andamento', tipo: 'meio' },
  { nome: 'Concluído', tipo: 'fim' }
];

const listar = () => db.query(sql.listar);

const buscar = (id) => db.get(sql.buscar, { id });

const buscarCompleto = (id) => {
  const quadro = buscar(id);
  if (!quadro) return undefined;

  const colunas = db.query(sql.colunas, { id });
  const tarefas = db.query(sql.tarefas, { id });

  return {
    ...quadro,
    colunas: colunas.map((coluna) => ({
      ...coluna,
      tarefas: tarefas.filter((tarefa) => tarefa.coluna_id === coluna.id)
    }))
  };
};

const criar = ({ nome, descricao }) =>
  db.transaction(() => {
    const quadro = db.get(sql.criar, { nome, descricao });

    COLUNAS_PADRAO.forEach((coluna, posicao) => {
      db.run(sql.criarColuna, { quadro_id: quadro.id, nome: coluna.nome, tipo: coluna.tipo, posicao });
    });

    return quadro;
  });

const atualizar = (id, { nome, descricao }) => db.get(sql.atualizar, { id, nome, descricao });

const remover = (id) => db.run(sql.remover, { id }).changes > 0;

module.exports = { listar, buscarCompleto, criar, atualizar, remover };
