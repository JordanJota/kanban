CREATE TABLE IF NOT EXISTS usuarios (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  nome        TEXT    NOT NULL,
  email       TEXT    NOT NULL UNIQUE,
  criado_em   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS quadros (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  nome        TEXT    NOT NULL,
  descricao   TEXT,
  criado_em   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS colunas (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  quadro_id   INTEGER NOT NULL REFERENCES quadros (id) ON DELETE CASCADE,
  nome        TEXT    NOT NULL,
  tipo        TEXT    NOT NULL DEFAULT 'meio' CHECK (tipo IN ('inicio', 'meio', 'fim')),
  posicao     INTEGER NOT NULL DEFAULT 0,
  criado_em   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS tarefas (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  coluna_id       INTEGER NOT NULL REFERENCES colunas (id) ON DELETE CASCADE,
  titulo          TEXT    NOT NULL,
  descricao       TEXT,
  prioridade      TEXT    NOT NULL DEFAULT 'media' CHECK (prioridade IN ('baixa', 'media', 'alta')),
  prazo           TEXT,
  responsavel_id  INTEGER REFERENCES usuarios (id) ON DELETE SET NULL,
  concluido_em    TEXT,
  criado_em       TEXT    NOT NULL DEFAULT (datetime('now'))
);
