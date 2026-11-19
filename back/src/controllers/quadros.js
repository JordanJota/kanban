const quadrosService = require('../services/quadros');

const listar = (_req, res, next) => {
  try {
    const data = quadrosService.listar();
    return res.status(200).json({ status: 'ok', message: 'Quadros listados com sucesso', data });
  } catch (error) {
    return next(error);
  }
};

const buscar = (req, res, next) => {
  try {
    const data = quadrosService.buscarCompleto(req.params.id);
    if (!data) {
      return res.status(404).json({ status: 'error', message: 'Quadro não encontrado' });
    }
    return res.status(200).json({ status: 'ok', message: 'Quadro encontrado com sucesso', data });
  } catch (error) {
    return next(error);
  }
};

const criar = (req, res, next) => {
  try {
    const data = quadrosService.criar(req.body);
    return res.status(201).json({ status: 'ok', message: 'Quadro criado com sucesso', data });
  } catch (error) {
    return next(error);
  }
};

const atualizar = (req, res, next) => {
  try {
    const data = quadrosService.atualizar(req.params.id, req.body);
    if (!data) {
      return res.status(404).json({ status: 'error', message: 'Quadro não encontrado' });
    }
    return res.status(200).json({ status: 'ok', message: 'Quadro atualizado com sucesso', data });
  } catch (error) {
    return next(error);
  }
};

const remover = (req, res, next) => {
  try {
    if (!quadrosService.remover(req.params.id)) {
      return res.status(404).json({ status: 'error', message: 'Quadro não encontrado' });
    }
    return res.status(200).json({ status: 'ok', message: 'Quadro removido com sucesso' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { listar, buscar, criar, atualizar, remover };
