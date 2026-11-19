const hojeISO = () => new Date().toLocaleDateString('en-CA');

const diasAte = (iso) => Math.round((new Date(iso) - new Date(hojeISO())) / 86400000);

export const formatarData = (iso) => (iso ? iso.slice(0, 10).split('-').reverse().join('/') : '');

export function situacaoTarefa(tarefa) {
  if (tarefa.concluido_em) {
    return tarefa.prazo && tarefa.concluido_em > tarefa.prazo ? 'concluida-fora' : 'concluida';
  }
  return tarefa.prazo && tarefa.prazo < hojeISO() ? 'atrasada' : 'normal';
}

export function chipDaTarefa(tarefa) {
  const situacao = situacaoTarefa(tarefa);

  if (situacao === 'concluida') return { icone: 'check_circle', texto: 'Concluída', cor: 'positive' };
  if (situacao === 'concluida-fora') {
    return { icone: 'warning', texto: 'Concluída fora do prazo', cor: 'deep-orange' };
  }
  if (!tarefa.prazo) return null;

  const dias = diasAte(tarefa.prazo);
  if (dias < 0) {
    return { icone: 'event_busy', texto: `Atrasada há ${-dias} dia${dias === -1 ? '' : 's'}`, cor: 'negative' };
  }
  if (dias <= 1) {
    return { icone: 'schedule', texto: dias === 0 ? 'Vence hoje' : 'Vence amanhã', cor: 'warning', textoCor: 'dark' };
  }
  return { icone: 'event', texto: formatarData(tarefa.prazo), cor: 'grey-3', textoCor: 'grey-9' };
}
