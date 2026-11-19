<template>
  <q-dialog v-model="aberto" @before-show="cancelarEdicao">
    <q-card style="width: 480px; max-width: 95vw">
      <q-card-section class="row items-center no-wrap q-pb-none">
        <div class="col text-h6">Usuários</div>
        <q-btn v-close-popup flat round dense icon="close" aria-label="Fechar" />
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-sm" @submit="salvar">
          <q-input v-model="nome" outlined dense label="Nome" />
          <q-input v-model="email" outlined dense type="email" label="E-mail" />
          <div class="row q-gutter-sm">
            <q-btn
              type="submit"
              unelevated
              no-caps
              color="primary"
              :loading="salvando"
              :label="editandoId ? 'Salvar alterações' : 'Adicionar usuário'"
            />
            <q-btn v-if="editandoId" flat no-caps label="Cancelar" @click="cancelarEdicao" />
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-list separator class="scroll" style="max-height: 280px">
        <q-item v-if="!store.lista.length">
          <q-item-section class="text-grey-7">Nenhum usuário cadastrado.</q-item-section>
        </q-item>

        <q-item v-for="usuario in store.lista" :key="usuario.id">
          <q-item-section avatar>
            <UsuarioAvatar :usuario="usuario" :tooltip="false" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ usuario.nome }}</q-item-label>
            <q-item-label caption>{{ usuario.email }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="row no-wrap">
              <q-btn flat round dense icon="edit" color="grey-7" aria-label="Editar usuário" @click="editar(usuario)" />
              <q-btn flat round dense icon="delete" color="grey-7" aria-label="Excluir usuário" @click="remover(usuario)" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';
import { confirmar } from '@/utils/dialogos';
import UsuarioAvatar from './UsuarioAvatar.vue';

const aberto = defineModel({ type: Boolean });

const store = useUsuariosStore();
const nome = ref('');
const email = ref('');
const editandoId = ref(null);
const salvando = ref(false);

function editar(usuario) {
  editandoId.value = usuario.id;
  nome.value = usuario.nome;
  email.value = usuario.email;
}

function cancelarEdicao() {
  editandoId.value = null;
  nome.value = '';
  email.value = '';
}

async function salvar() {
  salvando.value = true;
  try {
    const dados = { nome: nome.value, email: email.value };
    if (editandoId.value) await store.atualizar(editandoId.value, dados);
    else await store.criar(dados);
    cancelarEdicao();
  } finally {
    salvando.value = false;
  }
}

async function remover(usuario) {
  const ok = await confirmar({
    titulo: 'Excluir usuário',
    mensagem: `Excluir "${usuario.nome}"? As tarefas dele ficam sem responsável.`,
  });
  if (!ok) return;

  await store.remover(usuario.id);
  if (editandoId.value === usuario.id) cancelarEdicao();
}
</script>
