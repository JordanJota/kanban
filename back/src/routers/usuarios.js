const usuariosController = require('../controllers/usuarios');
const schemas = require('../schemas/usuarios');
const { paramId } = require('../schemas/comum');
const validar = require('../middlewares/validar');

module.exports = (app) => {
  app.get('/usuarios', usuariosController.listar);
  app.post('/usuarios', validar({ body: schemas.usuario }), usuariosController.criar);
  app.put(
    '/usuarios/:id',
    validar({ params: paramId(), body: schemas.usuario }),
    usuariosController.atualizar
  );
  app.delete('/usuarios/:id', validar({ params: paramId() }), usuariosController.remover);
};
