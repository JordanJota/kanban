import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usuariosService } from '@/services/usuarios.service';

export const useUsuariosStore = defineStore('usuarios', () => {
  const lista = ref([]);

  async function carregar() {
    lista.value = await usuariosService.listar();
  }

  async function criar(dados) {
    await usuariosService.criar(dados);
    await carregar();
  }

  async function atualizar(id, dados) {
    await usuariosService.atualizar(id, dados);
    await carregar();
  }

  async function remover(id) {
    await usuariosService.remover(id);
    await carregar();
  }

  return { lista, carregar, criar, atualizar, remover };
});
