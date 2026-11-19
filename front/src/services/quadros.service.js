import { api } from './api';

export const quadrosService = {
  listar: () => api('/quadros'),
  buscar: (id) => api(`/quadros/${id}`),
  criar: (dados) => api('/quadros', { method: 'POST', body: dados }),
  atualizar: (id, dados) => api(`/quadros/${id}`, { method: 'PUT', body: dados }),
  remover: (id) => api(`/quadros/${id}`, { method: 'DELETE' }),

  criarColuna: (quadroId, nome) =>
    api(`/quadros/${quadroId}/colunas`, { method: 'POST', body: { nome } }),
  renomearColuna: (id, nome) => api(`/colunas/${id}`, { method: 'PUT', body: { nome } }),
  moverColuna: (id, posicao) =>
    api(`/colunas/${id}/mover`, { method: 'PATCH', body: { posicao } }),
  removerColuna: (id) => api(`/colunas/${id}`, { method: 'DELETE' }),
};
