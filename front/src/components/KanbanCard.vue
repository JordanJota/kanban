<template>
  <q-card
    flat
    bordered
    class="cursor-pointer"
    :class="estilo.fundo"
    :style="{ opacity: arrastando ? 0.4 : 1 }"
    draggable="true"
    @dragstart="iniciarArraste"
    @dragend="arrastando = false"
    @click="emit('editar')"
  >
    <q-card-section horizontal>
      <q-separator vertical size="4px" :color="estilo.faixa" />

      <q-card-section class="col q-pa-sm">
        <div class="text-body2 text-weight-medium">{{ tarefa.titulo }}</div>

        <div v-if="tarefa.descricao" class="ellipsis-2-lines text-caption text-grey-7 q-mt-xs">
          {{ tarefa.descricao }}
        </div>

        <div class="row items-center no-wrap q-mt-sm">
          <q-chip
            v-if="chip"
            dense
            square
            class="q-ma-none q-mr-xs"
            :color="chip.cor"
            :text-color="chip.textoCor ?? 'white'"
            :icon="chip.icone"
          >
            {{ chip.texto }}
            <q-tooltip v-if="tarefa.prazo">Entrega prevista: {{ formatarData(tarefa.prazo) }}</q-tooltip>
          </q-chip>

          <q-icon name="flag" size="18px" :color="prioridade.cor">
            <q-tooltip>Prioridade {{ prioridade.nome.toLowerCase() }}</q-tooltip>
          </q-icon>

          <q-space />

          <UsuarioAvatar v-if="responsavel" :usuario="responsavel" size="26px" />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, ref } from 'vue';
import { chipDaTarefa, formatarData, situacaoTarefa } from '@/utils/prazo';
import { PRIORIDADES } from '@/utils/prioridades';
import UsuarioAvatar from './UsuarioAvatar.vue';

const props = defineProps({
  tarefa: { type: Object, required: true },
  responsavel: { type: Object, default: null },
});
const emit = defineEmits(['editar']);

const ESTILOS = {
  normal: { fundo: 'bg-white', faixa: 'grey-4' },
  atrasada: { fundo: 'bg-red-1', faixa: 'negative' },
  concluida: { fundo: 'bg-green-1', faixa: 'positive' },
  'concluida-fora': { fundo: 'bg-deep-orange-1', faixa: 'deep-orange' },
};

const arrastando = ref(false);
const situacao = computed(() => situacaoTarefa(props.tarefa));
const estilo = computed(() => ESTILOS[situacao.value]);
const chip = computed(() => chipDaTarefa(props.tarefa));
const prioridade = computed(() => PRIORIDADES.find((p) => p.valor === props.tarefa.prioridade));

function iniciarArraste(evento) {
  evento.dataTransfer.setData('text/plain', String(props.tarefa.id));
  evento.dataTransfer.effectAllowed = 'move';
  setTimeout(() => {
    arrastando.value = true;
  });
}
</script>
