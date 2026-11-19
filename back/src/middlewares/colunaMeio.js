const colunasService = require('../services/colunas');

module.exports = (req, res, next) => {
  const coluna = colunasService.buscar(req.params.id);
  if (!coluna) {
    return res.status(404).json({ status: 'error', message: 'Coluna não encontrada' });
  }
  if (coluna.tipo !== 'meio') {
    return res.status(400).json({
      status: 'error',
      message: `A coluna "${coluna.nome}" é fixa e não pode ser alterada`
    });
  }

  req.coluna = coluna;
  next();
};
