const tarefasService = require('../services/tarefas');
const colunasService = require('../services/colunas');

const criar = (req, res, next) => {
  try {
    const coluna = colunasService.buscar(req.params.colunaId);
    if (!coluna) {
      return res.status(404).json({ status: 'error', message: 'Coluna não encontrada' });
    }

    const data = tarefasService.criar(coluna, req.body);
    return res.status(201).json({ status: 'ok', message: 'Tarefa criada com sucesso', data });
  } catch (error) {
    if (error.message.includes('FOREIGN KEY')) {
      return res.status(404).json({ status: 'error', message: 'Responsável não encontrado' });
    }
    return next(error);
  }
};

const atualizar = (req, res, next) => {
  try {
    const data = tarefasService.atualizar(req.params.id, req.body);
    if (!data) {
      return res.status(404).json({ status: 'error', message: 'Tarefa não encontrada' });
    }
    return res.status(200).json({ status: 'ok', message: 'Tarefa atualizada com sucesso', data });
  } catch (error) {
    if (error.message.includes('FOREIGN KEY')) {
      return res.status(404).json({ status: 'error', message: 'Responsável não encontrado' });
    }
    return next(error);
  }
};

const mover = (req, res, next) => {
  try {
    const tarefa = tarefasService.buscar(req.params.id);
    if (!tarefa) {
      return res.status(404).json({ status: 'error', message: 'Tarefa não encontrada' });
    }

    const destino = colunasService.buscar(req.body.coluna_id);
    if (!destino) {
      return res.status(404).json({ status: 'error', message: 'Coluna de destino não encontrada' });
    }

    const origem = colunasService.buscar(tarefa.coluna_id);
    if (origem.quadro_id !== destino.quadro_id) {
      return res.status(400).json({
        status: 'error',
        message: 'A coluna de destino pertence a outro quadro'
      });
    }

    const data = tarefasService.mover(tarefa, destino);
    return res.status(200).json({ status: 'ok', message: 'Tarefa movida com sucesso', data });
  } catch (error) {
    return next(error);
  }
};

const remover = (req, res, next) => {
  try {
    if (!tarefasService.remover(req.params.id)) {
      return res.status(404).json({ status: 'error', message: 'Tarefa não encontrada' });
    }
    return res.status(200).json({ status: 'ok', message: 'Tarefa removida com sucesso' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { criar, atualizar, mover, remover };
