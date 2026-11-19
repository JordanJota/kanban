<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-2">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat no-caps no-wrap class="q-px-sm" :to="{ name: 'quadros' }">
          <q-icon name="view_kanban" size="28px" class="q-mr-sm" />
          <span class="text-h6 text-weight-bold">Kanban</span>
        </q-btn>

        <q-space />

        <q-btn unelevated no-caps color="white" text-color="primary" icon="group" aria-label="Usuários" @click="usuariosAberto = true">
          <span class="gt-xs q-ml-sm">Usuários</span>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <UsuariosDialog v-model="usuariosAberto" />
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import UsuariosDialog from '@/components/UsuariosDialog.vue';
import { useUsuariosStore } from '@/stores/usuarios';

const usuarios = useUsuariosStore();
const usuariosAberto = ref(false);

onMounted(usuarios.carregar);
</script>

