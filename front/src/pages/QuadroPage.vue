<template>
  <q-page padding>
    <template v-if="quadro">
      <div class="row items-start no-wrap q-mb-md">
        <q-btn flat round dense icon="arrow_back" class="q-mr-sm q-mt-xs" aria-label="Voltar" :to="{ name: 'quadros' }" />

        <div class="col">
          <div class="row items-center no-wrap">
            <h1 class="text-h5 text-weight-bold q-my-none ellipsis">{{ quadro.nome }}</h1>
            <q-btn flat round dense size="sm" icon="edit" class="q-ml-xs" aria-label="Editar quadro" @click="quadroAberto = true" />
          </div>
          <div v-if="quadro.descricao" class="text-body2 text-grey-7">{{ quadro.descricao }}</div>
        </div>

        <div class="row no-wrap gt-xs q-ml-md">
          <q-chip dense icon="list_alt" color="white" text-color="grey-8">
            {{ resumo.total }} {{ resumo.total === 1 ? 'tarefa' : 'tarefas' }}
          </q-chip>
          <q-chip dense icon="check_circle" color="white" text-color="positive">
            {{ resumo.concluidas }} {{ resumo.concluidas === 1 ? 'concluída' : 'concluídas' }}
          </q-chip>
          <q-chip v-if="resumo.atrasadas" dense icon="event_busy" color="negative" text-color="white">
            {{ resumo.atrasadas }} atrasada{{ resumo.atrasadas > 1 ? 's' : '' }}
          </q-chip>
        </div>
      </div>

      <div class="row items-center q-col-gutter-sm q-mb-md">
        <div class="col-12 col-sm-4 col-md-3">
          <q-input v-model="busca" outlined dense clearable bg-color="white" placeholder="Buscar tarefa">
            <template #prepend><q-icon name="search" /></template>
          </q-input>
        </div>

        <div class="col-12 col-sm-4 col-md-3">
          <q-select
            v-model="filtroUsuario"
            outlined
            dense
            emit-value
            map-options
            bg-color="white"
            label="Responsável"
            :options="opcoesFiltro"
          >
            <template #prepend><q-icon name="person" /></template>
          </q-select>
        </div>

        <div class="col-12 col-sm-4 col-md-3">
          <q-select
            v-model="ordem"
            outlined
            dense
            emit-value
            map-options
            bg-color="white"
            label="Ordenar por"
            :options="ORDENS"
          >
            <template #prepend><q-icon name="sort" /></template>
          </q-select>
        </div>

        <div class="col-auto">
          <q-chip v-model:selected="soAtrasadas" clickable color="white" text-color="negative" selected-color="negative" icon="event_busy">
            Só atrasadas
          </q-chip>
        </div>

        <div v-if="filtrando" class="col-auto">
          <q-btn flat dense no-caps color="primary" icon="filter_alt_off" label="Limpar filtros" @click="limparFiltros" />
        </div>
      </div>

      <div class="row no-wrap items-start q-gutter-md q-pb-md scroll">
        <KanbanColuna
          v-for="(coluna, indice) in quadro.colunas"
          :key="coluna.id"
          :coluna="coluna"
          :indice="indice"
          :total="quadro.colunas.length"
          :usuarios="usuarios.lista"
          :filtro="passaNoFiltro"
          :ordem="comparar"
          @criar-tarefa="(dados) => alterar(() => tarefasService.criar(coluna.id, dados))"
          @editar-tarefa="editar"
          @remover-coluna="alterar(() => quadrosService.removerColuna(coluna.id))"
          @renomear-coluna="(nome) => alterar(() => quadrosService.renomearColuna(coluna.id, nome))"
          @mover-coluna="(posicao) => alterar(() => quadrosService.moverColuna(coluna.id, posicao))"
          @mover-tarefa="(tarefaId) => alterar(() => tarefasService.mover(tarefaId, coluna.id))"
        />

        <q-form class="col-auto" style="width: 300px" @submit="adicionarColuna">
          <q-input v-model="novaColuna" outlined dense bg-color="white" placeholder="Nova coluna (antes de Concluído)">
            <template #prepend><q-icon name="add" /></template>
          </q-input>
        </q-form>
      </div>
    </template>

    <div v-else-if="!carregando" class="text-grey-7">Não foi possível carregar o quadro.</div>

    <q-inner-loading :showing="carregando" />

    <TarefaDialog
      v-model="tarefaAberta"
      :tarefa="tarefaEditando"
      :coluna-nome="colunaDaTarefa"
      :usuarios="usuarios.lista"
      @salvar="(dados) => alterar(() => tarefasService.atualizar(tarefaEditando.id, dados))"
      @remover="alterar(() => tarefasService.remover(tarefaEditando.id))"
    />
    <QuadroDialog
      v-model="quadroAberto"
      :quadro="quadro"
      @salvar="(dados) => alterar(() => quadrosService.atualizar(props.id, dados))"
    />
  </q-page>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import KanbanColuna from '@/components/KanbanColuna.vue';
import QuadroDialog from '@/components/QuadroDialog.vue';
import TarefaDialog from '@/components/TarefaDialog.vue';
import { quadrosService } from '@/services/quadros.service';
import { tarefasService } from '@/services/tarefas.service';
import { useUsuariosStore } from '@/stores/usuarios';
import { ORDENS } from '@/utils/ordenacao';
import { situacaoTarefa } from '@/utils/prazo';

const props = defineProps({ id: { type: String, required: true } });

const usuarios = useUsuariosStore();

const quadro = ref(null);
const carregando = ref(false);
const novaColuna = ref('');

const busca = ref('');
const filtroUsuario = ref(null);
const soAtrasadas = ref(false);
const ordem = ref('prazo');
const comparar = computed(() => ORDENS.find((o) => o.value === ordem.value).comparar);

const tarefaAberta = ref(false);
const tarefaEditando = ref(null);
const quadroAberto = ref(false);

const opcoesFiltro = computed(() => [
  { label: 'Todos', value: null },
  { label: 'Sem responsável', value: 0 },
  ...usuarios.lista.map((u) => ({ label: u.nome, value: u.id })),
]);

const filtrando = computed(() => !!busca.value?.trim() || filtroUsuario.value !== null || soAtrasadas.value);

const resumo = computed(() => {
  const tarefas = quadro.value.colunas.flatMap((c) => c.tarefas);
  return {
    total: tarefas.length,
    concluidas: tarefas.filter((t) => t.concluido_em).length,
    atrasadas: tarefas.filter((t) => situacaoTarefa(t) === 'atrasada').length,
  };
});

const colunaDaTarefa = computed(
  () => quadro.value?.colunas.find((c) => c.id === tarefaEditando.value?.coluna_id)?.nome ?? '',
);

function passaNoFiltro(tarefa) {
  const termo = (busca.value ?? '').trim().toLowerCase();
  if (termo && !`${tarefa.titulo} ${tarefa.descricao ?? ''}`.toLowerCase().includes(termo)) return false;

  if (filtroUsuario.value === 0 && tarefa.responsavel_id !== null) return false;
  if (filtroUsuario.value > 0 && tarefa.responsavel_id !== filtroUsuario.value) return false;

  return !soAtrasadas.value || situacaoTarefa(tarefa) === 'atrasada';
}

function limparFiltros() {
  busca.value = '';
  filtroUsuario.value = null;
  soAtrasadas.value = false;
}

async function carregar(silencioso = false) {
  carregando.value = !silencioso;
  try {
    quadro.value = await quadrosService.buscar(props.id);
  } finally {
    carregando.value = false;
  }
}

async function alterar(chamada) {
  await chamada();
  await carregar(true);
}

function editar(tarefa) {
  tarefaEditando.value = tarefa;
  tarefaAberta.value = true;
}

function adicionarColuna() {
  const nome = novaColuna.value;
  if (!nome.trim()) return;
  novaColuna.value = '';
  return alterar(() => quadrosService.criarColuna(props.id, nome));
}

watch(
  () => props.id,
  () => {
    limparFiltros();
    quadro.value = null;
    return carregar();
  },
  { immediate: true },
);

watch(
  () => usuarios.lista,
  (lista, anterior) => {
    if (lista.length >= anterior.length) return;
    if (filtroUsuario.value > 0 && !lista.some((u) => u.id === filtroUsuario.value)) filtroUsuario.value = null;
    return carregar(true);
  },
);
</script>
