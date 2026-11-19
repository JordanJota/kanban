const { z } = require('zod');
const { texto, textoOpcional } = require('./comum');

const quadro = z.object({ nome: texto, descricao: textoOpcional.default(null) });

module.exports = { quadro };
