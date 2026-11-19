<template>
  <q-card
    flat
    bordered
    class="column no-wrap col-auto bg-blue-grey-1"
    style="width: 300px; max-height: calc(100vh - 290px)"
  >
    <q-separator :color="corFaixa" size="3px" />

    <q-card-section class="row items-center no-wrap q-py-sm">
      <q-icon v-if="fixa" name="lock" size="xs" color="grey-6" class="q-mr-xs">
        <q-tooltip>Coluna fixa: não pode ser renomeada, movida nem excluída</q-tooltip>
      </q-icon>

      <div class="col ellipsis text-subtitle1 text-weight-bold" :class="{ 'cursor-pointer': !fixa }">
        {{ coluna.nome }}
        <template v-if="!fixa">
          <q-tooltip>Clique para renomear</q-tooltip>
          <q-popup-edit
            v-slot="scope"
            :model-value="coluna.nome"
            auto-save
            :validate="(valor) => !!valor.trim()"
            @save="(valor) => emit('renomear-coluna', valor)"
          >
            <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
          </q-popup-edit>
        </template>
      </div>

      <q-badge rounded color="grey-5" text-color="dark" class="q-mx-sm" :label="visiveis.length" />

      <q-btn v-if="!fixa" flat round dense icon="more_vert" color="grey-7" aria-label="Opções da coluna">
        <q-menu auto-close>
          <q-list dense style="min-width: 220px">
            <q-item clickable :disable="indice <= 1" @click="emit('mover-coluna', indice - 1)">
              <q-item-section avatar><q-icon name="arrow_back" /></q-item-section>
              <q-item-section>Mover para a esquerda</q-item-section>
            </q-item>
            <q-item clickable :disable="indice >= total - 2" @click="emit('mover-coluna', indice + 1)">
              <q-item-section avatar><q-icon name="arrow_forward" /></q-item-section>
              <q-item-section>Mover para a direita</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable class="text-negative" @click="remover">
              <q-item-section avatar><q-icon name="delete" /></q-item-section>
              <q-item-section>Excluir coluna</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-card-section>

    <q-card-section
      class="col column no-wrap scroll q-pt-none"
      :class="{ 'bg-indigo-1': arrastandoSobre }"
      style="min-height: 64px"
      @dragover.prevent="arrastandoSobre = true"
      @dragleave.self="arrastandoSobre = false"
      @drop.prevent="soltar"
    >
      <KanbanCard
        v-for="tarefa in visiveis"
        :key="tarefa.id"
        class="q-mb-sm"
        :tarefa="tarefa"
        :responsavel="responsavelDe(tarefa)"
        @editar="emit('editar-tarefa', tarefa)"
      />

      <div v-if="!visiveis.length" class="text-center text-caption text-grey-6 bg-blue-grey-2 rounded-borders q-pa-md">
        {{ coluna.tarefas.length ? 'Nenhuma tarefa com esses filtros' : 'Arraste tarefas para cá' }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-sm">
      <q-form @submit="adicionar">
        <q-input v-model="titulo" outlined dense bg-color="white" placeholder="Adicionar tarefa">
          <template #prepend><q-icon name="add" /></template>
        </q-input>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, ref } from 'vue';
import { confirmar } from '@/utils/dialogos';
import KanbanCard from './KanbanCard.vue';

const props = defineProps({
  coluna: { type: Object, required: true },
  indice: { type: Number, required: true },
  total: { type: Number, required: true },
  usuarios: { type: Array, default: () => [] },
  filtro: { type: Function, default: () => true },
  ordem: { type: Function, default: () => 0 },
});
const emit = defineEmits([
  'criar-tarefa',
  'editar-tarefa',
  'remover-coluna',
  'renomear-coluna',
  'mover-coluna',
  'mover-tarefa',
]);

const FAIXAS = { inicio: 'secondary', meio: 'primary', fim: 'positive' };

const fixa = computed(() => props.coluna.tipo !== 'meio');
const corFaixa = computed(() => FAIXAS[props.coluna.tipo]);

const titulo = ref('');
const arrastandoSobre = ref(false);

const visiveis = computed(() => props.coluna.tarefas.filter(props.filtro).sort(props.ordem));

function responsavelDe(tarefa) {
  return props.usuarios.find((u) => u.id === tarefa.responsavel_id) ?? null;
}

function adicionar() {
  if (!titulo.value.trim()) return;
  emit('criar-tarefa', { titulo: titulo.value });
  titulo.value = '';
}

async function remover() {
  const qtd = props.coluna.tarefas.length;
  const aviso = qtd ? ` As ${qtd} tarefa(s) dela serão movidas para "A fazer".` : '';
  const ok = await confirmar({
    titulo: 'Excluir coluna',
    mensagem: `Excluir a coluna "${props.coluna.nome}"?${aviso}`,
  });
  if (ok) emit('remover-coluna');
}

function soltar(evento) {
  arrastandoSobre.value = false;
  const tarefaId = Number(evento.dataTransfer.getData('text/plain'));
  if (tarefaId && !props.coluna.tarefas.some((t) => t.id === tarefaId)) emit('mover-tarefa', tarefaId);
}
</script>
