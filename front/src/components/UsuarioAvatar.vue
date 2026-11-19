<template>
  <q-avatar :size="size" :color="CORES[usuario.id % CORES.length]" text-color="white">
    {{ iniciais }}
    <q-tooltip v-if="tooltip">{{ usuario.nome }}</q-tooltip>
  </q-avatar>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  usuario: { type: Object, required: true },
  size: { type: String, default: '28px' },
  tooltip: { type: Boolean, default: true },
});

const CORES = ['indigo', 'teal', 'deep-orange', 'purple', 'cyan-8', 'pink', 'green-8', 'brown'];

const iniciais = computed(() =>
  props.usuario.nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase(),
);
</script>
