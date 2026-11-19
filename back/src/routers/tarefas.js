const tarefasController = require('../controllers/tarefas');
const schemas = require('../schemas/tarefas');
const { paramId } = require('../schemas/comum');
const validar = require('../middlewares/validar');

module.exports = (app) => {
  app.post(
    '/colunas/:colunaId/tarefas',
    validar({ params: paramId('colunaId'), body: schemas.tarefa }),
    tarefasController.criar
  );
  app.put(
    '/tarefas/:id',
    validar({ params: paramId(), body: schemas.tarefa }),
    tarefasController.atualizar
  );
  app.patch(
    '/tarefas/:id/mover',
    validar({ params: paramId(), body: schemas.mover }),
    tarefasController.mover
  );
  app.delete('/tarefas/:id', validar({ params: paramId() }), tarefasController.remover);
};
