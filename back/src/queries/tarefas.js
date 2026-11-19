module.exports = {
  hoje: "SELECT date('now', 'localtime') AS hoje",

  buscar: 'SELECT * FROM tarefas WHERE id = :id',

  criar: `
    INSERT INTO tarefas (coluna_id, titulo, descricao, prioridade, prazo, responsavel_id, concluido_em)
    VALUES (:coluna_id, :titulo, :descricao, :prioridade, :prazo, :responsavel_id, :concluido_em)
    RETURNING *`,

  atualizar: `
    UPDATE tarefas
       SET titulo = :titulo, descricao = :descricao, prioridade = :prioridade,
           prazo = :prazo, responsavel_id = :responsavel_id
     WHERE id = :id
     RETURNING *`,

  mover: `
    UPDATE tarefas
       SET coluna_id = :coluna_id, concluido_em = :concluido_em
     WHERE id = :id
     RETURNING *`,

  remover: 'DELETE FROM tarefas WHERE id = :id'
};
