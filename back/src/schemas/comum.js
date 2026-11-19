const { z } = require('zod');

const id = z.coerce.number({ error: 'inválido' }).int('inválido').positive('inválido');
const posicao = z.number({ error: 'inválida' }).int('inválida').min(0, 'inválida');
const texto = z.string({ error: 'obrigatório' }).trim().min(1, 'obrigatório');
const textoOpcional = z.string().trim().nullable().transform((valor) => valor || null);
const paramId = (nome = 'id') => z.object({ [nome]: id });

module.exports = { id, posicao, texto, textoOpcional, paramId };
