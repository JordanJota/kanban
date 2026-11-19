module.exports = {
  listar: `
    SELECT q.id, q.nome, q.descricao, q.criado_em,
           COUNT(t.id) AS total,
           COUNT(t.id) FILTER (WHERE t.concluido_em IS NOT NULL) AS concluidas,
           COUNT(t.id) FILTER (WHERE t.concluido_em IS NULL AND t.prazo < date('now', 'localtime')) AS atrasadas
      FROM quadros q
      LEFT JOIN colunas c ON c.quadro_id = q.id
      LEFT JOIN tarefas t ON t.coluna_id = c.id
     GROUP BY q.id
     ORDER BY q.id DESC`,

  buscar: 'SELECT * FROM quadros WHERE id = :id',

  colunas: 'SELECT * FROM colunas WHERE quadro_id = :id ORDER BY posicao',

  tarefas: `
    SELECT t.*
      FROM tarefas t
      JOIN colunas c ON c.id = t.coluna_id
     WHERE c.quadro_id = :id
     ORDER BY t.id`,

  criar: `
    INSERT INTO quadros (nome, descricao)
    VALUES (:nome, :descricao)
    RETURNING *`,

  criarColuna: `
    INSERT INTO colunas (quadro_id, nome, tipo, posicao)
    VALUES (:quadro_id, :nome, :tipo, :posicao)`,

  atualizar: `
    UPDATE quadros
       SET nome = :nome, descricao = :descricao
     WHERE id = :id
     RETURNING *`,

  remover: 'DELETE FROM quadros WHERE id = :id'
};
