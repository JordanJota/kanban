const usuariosRoute = require('./usuarios');
const quadrosRoute = require('./quadros');
const colunasRoute = require('./colunas');
const tarefasRoute = require('./tarefas');

module.exports = (app) => {
  usuariosRoute(app);
  quadrosRoute(app);
  colunasRoute(app);
  tarefasRoute(app);
};
