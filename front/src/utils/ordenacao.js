import { PRIORIDADES } from './prioridades';

const porPrazo = (a, b) => (a.prazo ?? '9999').localeCompare(b.prazo ?? '9999') || a.id - b.id;
const nivel = (tarefa) => PRIORIDADES.findIndex((p) => p.valor === tarefa.prioridade);

export const ORDENS = [
  { value: 'prazo', label: 'Prazo', comparar: porPrazo },
  { value: 'prioridade', label: 'Prioridade', comparar: (a, b) => nivel(b) - nivel(a) || porPrazo(a, b) },
  { value: 'recentes', label: 'Mais recentes', comparar: (a, b) => b.id - a.id },
  { value: 'antigas', label: 'Mais antigas', comparar: (a, b) => a.id - b.id },
  { value: 'titulo', label: 'Título (A-Z)', comparar: (a, b) => a.titulo.localeCompare(b.titulo) },
];
