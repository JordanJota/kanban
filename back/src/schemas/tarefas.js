const { z } = require('zod');
const { id, texto, textoOpcional } = require('./comum');

const prioridade = z.enum(['baixa', 'media', 'alta'], { error: 'deve ser baixa, media ou alta' });
const prazo = z.iso.date({ error: 'data inválida, use AAAA-MM-DD' });

const tarefa = z.object({
  titulo: texto,
  descricao: textoOpcional.default(null),
  prioridade: prioridade.default('media'),
  prazo: prazo.nullable().default(null),
  responsavel_id: id.nullable().default(null),
});

const mover = z.object({ coluna_id: id });

module.exports = { tarefa, mover };
