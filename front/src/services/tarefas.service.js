import { api } from './api';

export const tarefasService = {
  criar: (colunaId, dados) =>
    api(`/colunas/${colunaId}/tarefas`, { method: 'POST', body: dados }),
  atualizar: (id, dados) => api(`/tarefas/${id}`, { method: 'PUT', body: dados }),
  mover: (id, colunaId) => api(`/tarefas/${id}/mover`, { method: 'PATCH', body: { coluna_id: colunaId } }),
  remover: (id) => api(`/tarefas/${id}`, { method: 'DELETE' }),
};
