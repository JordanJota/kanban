const { z } = require('zod');
const { posicao, texto } = require('./comum');

const coluna = z.object({ nome: texto });
const mover = z.object({ posicao });

module.exports = { coluna, mover };
