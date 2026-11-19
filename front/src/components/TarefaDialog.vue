<template>
  <q-dialog v-model="aberto" @before-show="preencher">
    <q-card style="width: 480px; max-width: 95vw">
      <q-form @submit="salvar">
        <q-card-section class="row items-start no-wrap q-pb-none">
          <div class="col">
            <div class="text-h6">Editar tarefa</div>
            <div class="text-caption text-grey-7">{{ subtitulo }}</div>
          </div>
          <q-btn v-close-popup flat round dense icon="close" aria-label="Fechar" />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="form.titulo"
            class="q-mb-md"
            outlined
            dense
            autofocus
            hide-bottom-space
            label="Título"
            :rules="[(valor) => !!valor?.trim() || 'Informe o título']"
          />

          <q-input
            v-model="form.descricao"
            class="q-mb-md"
            outlined
            dense
            autogrow
            type="textarea"
            label="Descrição"
          />

          <div class="q-mb-md">
            <div class="text-caption text-grey-7 q-mb-xs">Prioridade</div>
            <q-btn-toggle
              v-model="form.prioridade"
              spread
              no-caps
              unelevated
              color="grey-3"
              text-color="grey-8"
              toggle-color="primary"
              :options="OPCOES_PRIORIDADE"
            />
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.prazo"
                outlined
                dense
                clearable
                stack-label
                type="date"
                label="Entrega prevista"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-select
                v-model="form.responsavel_id"
                outlined
                dense
                clearable
                emit-value
                map-options
                label="Responsável"
                :options="opcoes"
              >
                <template #option="{ itemProps, opt }">
                  <q-item v-bind="itemProps">
                    <q-item-section avatar>
                      <UsuarioAvatar :usuario="opt.usuario" size="28px" :tooltip="false" />
                    </q-item-section>
                    <q-item-section>{{ opt.label }}</q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat no-caps color="negative" icon="delete" label="Excluir" @click="remover" />
          <q-space />
          <q-btn v-close-popup flat no-caps label="Cancelar" />
          <q-btn type="submit" unelevated no-caps color="primary" label="Salvar" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { confirmar } from '@/utils/dialogos';
import { formatarData } from '@/utils/prazo';
import { PRIORIDADES } from '@/utils/prioridades';
import UsuarioAvatar from './UsuarioAvatar.vue';

const props = defineProps({
  tarefa: { type: Object, default: null },
  colunaNome: { type: String, default: '' },
  usuarios: { type: Array, default: () => [] },
});
const emit = defineEmits(['salvar', 'remover']);
const aberto = defineModel({ type: Boolean });

const OPCOES_PRIORIDADE = PRIORIDADES.map(({ valor, nome }) => ({ value: valor, label: nome, icon: 'flag' }));

const form = reactive({ titulo: '', descricao: '', prioridade: 'media', prazo: '', responsavel_id: null });

const opcoes = computed(() =>
  props.usuarios.map((usuario) => ({ label: usuario.nome, value: usuario.id, usuario })),
);

const subtitulo = computed(() =>
  props.tarefa
    ? `Na coluna "${props.colunaNome}" · Criada em ${formatarData(props.tarefa.criado_em)}`
    : '',
);

function preencher() {
  form.titulo = props.tarefa.titulo;
  form.descricao = props.tarefa.descricao ?? '';
  form.prioridade = props.tarefa.prioridade;
  form.prazo = props.tarefa.prazo ?? '';
  form.responsavel_id = props.tarefa.responsavel_id;
}

function salvar() {
  emit('salvar', {
    titulo: form.titulo,
    descricao: form.descricao,
    prioridade: form.prioridade,
    prazo: form.prazo || null,
    responsavel_id: form.responsavel_id ?? null,
  });
  aberto.value = false;
}

async function remover() {
  const ok = await confirmar({
    titulo: 'Excluir tarefa',
    mensagem: `Excluir a tarefa "${props.tarefa.titulo}"?`,
  });
  if (!ok) return;
  emit('remover');
  aberto.value = false;
}
</script>
