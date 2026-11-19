module.exports = {
  listar: 'SELECT * FROM usuarios ORDER BY nome',

  criar: `
    INSERT INTO usuarios (nome, email)
    VALUES (:nome, :email)
    RETURNING *`,

  atualizar: `
    UPDATE usuarios
       SET nome = :nome, email = :email
     WHERE id = :id
     RETURNING *`,

  remover: 'DELETE FROM usuarios WHERE id = :id'
};
