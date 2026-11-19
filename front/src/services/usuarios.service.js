import { api } from './api';

export const usuariosService = {
  listar: () => api('/usuarios'),
  criar: (dados) => api('/usuarios', { method: 'POST', body: dados }),
  atualizar: (id, dados) => api(`/usuarios/${id}`, { method: 'PUT', body: dados }),
  remover: (id) => api(`/usuarios/${id}`, { method: 'DELETE' }),
};
