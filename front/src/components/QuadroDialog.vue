<template>
  <q-dialog v-model="aberto" @before-show="preencher">
    <q-card style="width: 440px; max-width: 95vw">
      <q-form @submit="salvar">
        <q-card-section>
          <div class="text-h6">{{ quadro ? 'Editar quadro' : 'Novo quadro' }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md q-pt-none">
          <q-input
            v-model="form.nome"
            outlined
            dense
            autofocus
            label="Nome"
            :rules="[(valor) => !!valor?.trim() || 'Informe o nome do quadro']"
          />
          <q-input
            v-model="form.descricao"
            outlined
            dense
            autogrow
            type="textarea"
            label="Descrição (opcional)"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat no-caps label="Cancelar" />
          <q-btn type="submit" unelevated no-caps color="primary" :label="quadro ? 'Salvar' : 'Criar quadro'" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({ quadro: { type: Object, default: null } });
const emit = defineEmits(['salvar']);
const aberto = defineModel({ type: Boolean });

const form = reactive({ nome: '', descricao: '' });

function preencher() {
  form.nome = props.quadro?.nome ?? '';
  form.descricao = props.quadro?.descricao ?? '';
}

function salvar() {
  emit('salvar', { nome: form.nome, descricao: form.descricao });
  aberto.value = false;
}
</script>
