import { Dialog, Notify } from 'quasar';

export function confirmar({ titulo, mensagem, textoOk = 'Excluir' }) {
  return new Promise((resolve) => {
    Dialog.create({
      title: titulo,
      message: mensagem,
      persistent: true,
      cancel: { label: 'Cancelar', flat: true },
      ok: { label: textoOk, color: 'negative', flat: true },
    })
      .onOk(() => resolve(true))
      .onCancel(() => resolve(false))
      .onDismiss(() => resolve(false));
  });
}

export function avisarErro(erro) {
  Notify.create({
    type: 'negative',
    position: 'top',
    message: erro?.message ?? String(erro),
  });
}
