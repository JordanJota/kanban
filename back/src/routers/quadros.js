const quadrosController = require('../controllers/quadros');
const schemas = require('../schemas/quadros');
const { paramId } = require('../schemas/comum');
const validar = require('../middlewares/validar');

module.exports = (app) => {
  app.get('/quadros', quadrosController.listar);
  app.post('/quadros', validar({ body: schemas.quadro }), quadrosController.criar);
  app.get('/quadros/:id', validar({ params: paramId() }), quadrosController.buscar);
  app.put(
    '/quadros/:id',
    validar({ params: paramId(), body: schemas.quadro }),
    quadrosController.atualizar
  );
  app.delete('/quadros/:id', validar({ params: paramId() }), quadrosController.remover);
};
