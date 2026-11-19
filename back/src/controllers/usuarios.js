const usuariosService = require('../services/usuarios');

const listar = (_req, res, next) => {
  try {
    const data = usuariosService.listar();
    return res.status(200).json({ status: 'ok', message: 'Usuários listados com sucesso', data });
  } catch (error) {
    return next(error);
  }
};

const criar = (req, res, next) => {
  try {
    const data = usuariosService.criar(req.body);
    return res.status(201).json({ status: 'ok', message: 'Usuário criado com sucesso', data });
  } catch (error) {
    return next(error);
  }
};

const atualizar = (req, res, next) => {
  try {
    const data = usuariosService.atualizar(req.params.id, req.body);
    if (!data) {
      return res.status(404).json({ status: 'error', message: 'Usuário não encontrado' });
    }
    return res.status(200).json({ status: 'ok', message: 'Usuário atualizado com sucesso', data });
  } catch (error) {
    return next(error);
  }
};

const remover = (req, res, next) => {
  try {
    if (!usuariosService.remover(req.params.id)) {
      return res.status(404).json({ status: 'error', message: 'Usuário não encontrado' });
    }
    return res.status(200).json({ status: 'ok', message: 'Usuário removido com sucesso' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { listar, criar, atualizar, remover };
