const colunasService = require('../services/colunas');

const criar = (req, res, next) => {
  try {
    const data = colunasService.criar(req.params.quadroId, req.body);
    return res.status(201).json({ status: 'ok', message: 'Coluna criada com sucesso', data });
  } catch (error) {
    if (error.message.includes('FOREIGN KEY')) {
      return res.status(404).json({ status: 'error', message: 'Quadro não encontrado' });
    }
    return next(error);
  }
};

const atualizar = (req, res, next) => {
  try {
    const data = colunasService.atualizar(req.coluna.id, req.body);
    return res.status(200).json({ status: 'ok', message: 'Coluna atualizada com sucesso', data });
  } catch (error) {
    return next(error);
  }
};

const mover = (req, res, next) => {
  try {
    const data = colunasService.mover(req.coluna, req.body);
    return res.status(200).json({ status: 'ok', message: 'Coluna movida com sucesso', data });
  } catch (error) {
    return next(error);
  }
};

const remover = (req, res, next) => {
  try {
    colunasService.remover(req.coluna);
    return res.status(200).json({ status: 'ok', message: 'Coluna removida com sucesso' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { criar, atualizar, mover, remover };
