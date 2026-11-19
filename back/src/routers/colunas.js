const colunasController = require('../controllers/colunas');
const schemas = require('../schemas/colunas');
const { paramId } = require('../schemas/comum');
const validar = require('../middlewares/validar');
const colunaMeio = require('../middlewares/colunaMeio');

module.exports = (app) => {
  app.post(
    '/quadros/:quadroId/colunas',
    validar({ params: paramId('quadroId'), body: schemas.coluna }),
    colunasController.criar
  );
  app.put(
    '/colunas/:id',
    validar({ params: paramId(), body: schemas.coluna }),
    colunaMeio,
    colunasController.atualizar
  );
  app.patch(
    '/colunas/:id/mover',
    validar({ params: paramId(), body: schemas.mover }),
    colunaMeio,
    colunasController.mover
  );
  app.delete('/colunas/:id', validar({ params: paramId() }), colunaMeio, colunasController.remover);
};
