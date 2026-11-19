<template>
  <q-page padding>
    <div class="row items-center q-mb-lg">
      <div class="col">
        <h1 class="text-h5 text-weight-bold q-my-none">Meus quadros</h1>
        <div class="text-body2 text-grey-7">Organize seus projetos em colunas e tarefas.</div>
      </div>
      <q-btn unelevated no-caps color="primary" icon="add" label="Novo quadro" @click="abrirNovo" />
    </div>

    <div v-if="!carregando && !quadros.length" class="column items-center text-center q-pa-xl">
      <q-icon name="view_kanban" size="72px" color="grey-5" />
      <div class="text-h6 q-mt-md">Nenhum quadro ainda</div>
      <div class="text-grey-7 q-mb-md">Crie o primeiro para começar a organizar suas tarefas.</div>
      <q-btn unelevated no-caps color="primary" icon="add" label="Criar primeiro quadro" @click="abrirNovo" />
    </div>

    <div class="row q-col-gutter-md">
      <div v-for="quadro in quadros" :key="quadro.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card flat bordered class="full-height relative-position">
          <q-item clickable class="full-height q-pa-md" :to="{ name: 'quadro', params: { id: quadro.id } }">
            <q-item-section>
              <div class="text-subtitle1 text-weight-bold ellipsis q-pr-lg">{{ quadro.nome }}</div>
              <div class="ellipsis-2-lines text-body2 text-grey-7">{{ quadro.descricao || 'Sem descrição' }}</div>

              <q-linear-progress
                rounded
                size="8px"
                color="positive"
                track-color="grey-3"
                class="q-mt-md"
                :value="quadro.total ? quadro.concluidas / quadro.total : 0"
              />
              <div class="row items-center q-mt-sm text-caption text-grey-8">
                <span>{{ quadro.concluidas }}/{{ quadro.total }} concluídas</span>
                <q-space />
                <q-chip v-if="quadro.atrasadas" dense square class="q-ma-none" color="negative" text-color="white" icon="event_busy">
                  {{ quadro.atrasadas }} atrasada{{ quadro.atrasadas > 1 ? 's' : '' }}
                </q-chip>
              </div>
            </q-item-section>
          </q-item>

          <q-btn flat round dense icon="more_vert" color="grey-7" class="absolute-top-right q-ma-sm" aria-label="Opções do quadro">
            <q-menu auto-close>
              <q-list dense style="min-width: 140px">
                <q-item clickable @click="abrirEdicao(quadro)">
                  <q-item-section avatar><q-icon name="edit" /></q-item-section>
                  <q-item-section>Editar</q-item-section>
                </q-item>
                <q-item clickable class="text-negative" @click="remover(quadro)">
                  <q-item-section avatar><q-icon name="delete" /></q-item-section>
                  <q-item-section>Excluir</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-card>
      </div>
    </div>

    <q-inner-loading :showing="carregando" />

    <QuadroDialog v-model="dialogoAberto" :quadro="editando" @salvar="salvar" />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import QuadroDialog from '@/components/QuadroDialog.vue';
import { quadrosService } from '@/services/quadros.service';
import { confirmar } from '@/utils/dialogos';

const router = useRouter();

const quadros = ref([]);
const carregando = ref(true);
const dialogoAberto = ref(false);
const editando = ref(null);

async function carregar() {
  try {
    quadros.value = await quadrosService.listar();
  } finally {
    carregando.value = false;
  }
}

onMounted(carregar);

function abrirNovo() {
  editando.value = null;
  dialogoAberto.value = true;
}

function abrirEdicao(quadro) {
  editando.value = quadro;
  dialogoAberto.value = true;
}

async function salvar(dados) {
  if (!editando.value) {
    const novo = await quadrosService.criar(dados);
    router.push({ name: 'quadro', params: { id: novo.id } });
    return;
  }
  await quadrosService.atualizar(editando.value.id, dados);
  await carregar();
}

async function remover(quadro) {
  const ok = await confirmar({
    titulo: 'Excluir quadro',
    mensagem: `Excluir o quadro "${quadro.nome}" e todas as suas tarefas?`,
  });
  if (!ok) return;

  await quadrosService.remover(quadro.id);
  await carregar();
}
</script>
