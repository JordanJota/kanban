const { z } = require('zod');
const { texto } = require('./comum');

const email = z.string({ error: 'obrigatório' }).trim().toLowerCase().pipe(z.email('inválido'));

const usuario = z.object({ nome: texto, email });

module.exports = { usuario };
