module.exports = {
  buscar: 'SELECT * FROM colunas WHERE id = :id',

  criar: `
    INSERT INTO colunas (quadro_id, nome, tipo, posicao)
    VALUES (
      :quadro_id,
      :nome,
      'meio',
      COALESCE((SELECT posicao FROM colunas WHERE quadro_id = :quadro_id AND tipo = 'fim'), 0)
    )
    RETURNING *`,

  empurrarFim: "UPDATE colunas SET posicao = posicao + 1 WHERE quadro_id = :quadro_id AND tipo = 'fim'",

  atualizar: `
    UPDATE colunas
       SET nome = :nome
     WHERE id = :id
     RETURNING *`,

  outras: 'SELECT id FROM colunas WHERE quadro_id = :quadro_id AND id != :id ORDER BY posicao',

  posicionar: 'UPDATE colunas SET posicao = :posicao WHERE id = :id',

  inicio: "SELECT id FROM colunas WHERE quadro_id = :quadro_id AND tipo = 'inicio'",

  moverTarefas: 'UPDATE tarefas SET coluna_id = :destino WHERE coluna_id = :origem',

  remover: 'DELETE FROM colunas WHERE id = :id'
};
