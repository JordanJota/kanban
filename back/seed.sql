PRAGMA foreign_keys = ON;

BEGIN;

DELETE FROM quadros WHERE nome IN ('Lançamento do App', 'Reforma do Escritório', 'Marketing do 4º trimestre');
DELETE FROM usuarios WHERE email LIKE '%@exemplo.com';

INSERT INTO usuarios (nome, email) VALUES
  ('teste1', 'teste1@exemplo.com'),
  ('teste2', 'teste2@exemplo.com'),
  ('teste3', 'teste3@exemplo.com'),
  ('teste4', 'teste4@exemplo.com'),
  ('teste5', 'teste5@exemplo.com');

INSERT INTO quadros (nome, descricao) VALUES
  ('Lançamento do App', 'Primeira versão do aplicativo mobile para iOS e Android'),
  ('Reforma do Escritório', 'Reorganização das salas e compra de móveis novos'),
  ('Marketing do 4º trimestre', 'Ações de conteúdo e campanhas até dezembro');

WITH v(quadro, nome, tipo, posicao) AS (VALUES
  ('Lançamento do App', 'A fazer', 'inicio', 0),
  ('Lançamento do App', 'Em andamento', 'meio', 1),
  ('Lançamento do App', 'Em revisão', 'meio', 2),
  ('Lançamento do App', 'Em teste', 'meio', 3),
  ('Lançamento do App', 'Concluído', 'fim', 4),
  ('Reforma do Escritório', 'A fazer', 'inicio', 0),
  ('Reforma do Escritório', 'Em andamento', 'meio', 1),
  ('Reforma do Escritório', 'Aguardando fornecedor', 'meio', 2),
  ('Reforma do Escritório', 'Concluído', 'fim', 3),
  ('Marketing do 4º trimestre', 'A fazer', 'inicio', 0),
  ('Marketing do 4º trimestre', 'Em andamento', 'meio', 1),
  ('Marketing do 4º trimestre', 'Concluído', 'fim', 2)
)
INSERT INTO colunas (quadro_id, nome, tipo, posicao)
SELECT q.id, v.nome, v.tipo, v.posicao
  FROM v
  JOIN quadros q ON q.nome = v.quadro;

WITH v(quadro, coluna, titulo, descricao, prioridade, prazo, responsavel) AS (VALUES
  ('Lançamento do App', 'A fazer', 'Definir escopo do MVP', 'Listar as funcionalidades essenciais e o que fica para a versão 2', 'alta', date('now', 'localtime', '-4 days'), 'teste1@exemplo.com'),
  ('Lançamento do App', 'A fazer', 'Criar identidade visual', 'Logo, paleta de cores e ícone do aplicativo', 'media', date('now', 'localtime', '+3 days'), 'teste3@exemplo.com'),
  ('Lançamento do App', 'A fazer', 'Contratar serviço de notificações push', NULL, 'media', date('now', 'localtime', '+1 days'), 'teste4@exemplo.com'),
  ('Lançamento do App', 'A fazer', 'Planejar campanha de lançamento', NULL, 'baixa', date('now', 'localtime', '+20 days'), 'teste5@exemplo.com'),
  ('Lançamento do App', 'A fazer', 'Pesquisar aplicativos concorrentes', NULL, 'baixa', NULL, NULL),

  ('Lançamento do App', 'Em andamento', 'Desenvolver tela de login', 'Login com e-mail e senha, além de entrar com Google', 'alta', date('now', 'localtime'), 'teste2@exemplo.com'),
  ('Lançamento do App', 'Em andamento', 'Integrar API de pagamento', 'Cartão de crédito e Pix', 'alta', date('now', 'localtime', '-1 days'), 'teste4@exemplo.com'),
  ('Lançamento do App', 'Em andamento', 'Escrever textos da loja de aplicativos', NULL, 'media', date('now', 'localtime', '+6 days'), 'teste5@exemplo.com'),

  ('Lançamento do App', 'Em revisão', 'Revisar fluxo de cadastro', 'Conferir mensagens de erro e textos dos formulários', 'media', date('now', 'localtime', '+2 days'), 'teste1@exemplo.com'),

  ('Lançamento do App', 'Em teste', 'Testar em dispositivos Android', 'Pelo menos 5 modelos diferentes', 'alta', date('now', 'localtime', '+5 days'), 'teste2@exemplo.com'),

  ('Lançamento do App', 'Concluído', 'Configurar repositório e integração contínua', NULL, 'media', date('now', 'localtime', '+2 days'), 'teste4@exemplo.com'),
  ('Lançamento do App', 'Concluído', 'Montar o time de desenvolvimento', NULL, 'baixa', date('now', 'localtime', '+2 days'), 'teste3@exemplo.com'),
  ('Lançamento do App', 'Concluído', 'Escolher o nome do aplicativo', 'Nome definido após votação com a equipe', 'media', date('now', 'localtime', '-5 days'), 'teste1@exemplo.com'),
  ('Lançamento do App', 'Concluído', 'Registrar conta de desenvolvedor', NULL, 'media', NULL, 'teste4@exemplo.com'),

  ('Reforma do Escritório', 'A fazer', 'Pedir orçamento de mesas', NULL, 'media', date('now', 'localtime', '+4 days'), 'teste3@exemplo.com'),
  ('Reforma do Escritório', 'A fazer', 'Contratar eletricista', 'Revisar a fiação antes de instalar o ar-condicionado', 'alta', date('now', 'localtime', '-2 days'), 'teste4@exemplo.com'),
  ('Reforma do Escritório', 'A fazer', 'Escolher a cor das paredes', NULL, 'baixa', NULL, NULL),
  ('Reforma do Escritório', 'A fazer', 'Definir o layout das salas', NULL, 'media', date('now', 'localtime', '+8 days'), 'teste1@exemplo.com'),

  ('Reforma do Escritório', 'Em andamento', 'Pintura da recepção', NULL, 'media', date('now', 'localtime'), 'teste2@exemplo.com'),
  ('Reforma do Escritório', 'Em andamento', 'Instalar ar-condicionado', NULL, 'alta', date('now', 'localtime', '+3 days'), 'teste4@exemplo.com'),

  ('Reforma do Escritório', 'Aguardando fornecedor', 'Cadeiras ergonômicas', 'Entrega prevista em duas semanas após o pedido', 'media', date('now', 'localtime', '+10 days'), 'teste3@exemplo.com'),

  ('Reforma do Escritório', 'Concluído', 'Aprovar o orçamento geral', NULL, 'alta', date('now', 'localtime', '+1 days'), 'teste5@exemplo.com'),
  ('Reforma do Escritório', 'Concluído', 'Esvaziar a sala de reuniões', NULL, 'baixa', date('now', 'localtime', '-3 days'), 'teste2@exemplo.com'),

  ('Marketing do 4º trimestre', 'A fazer', 'Calendário editorial de novembro', NULL, 'media', date('now', 'localtime', '+5 days'), 'teste5@exemplo.com'),
  ('Marketing do 4º trimestre', 'A fazer', 'Gravar vídeo institucional', 'Roteiro aprovado, falta agendar o estúdio', 'alta', date('now', 'localtime', '+12 days'), 'teste3@exemplo.com'),
  ('Marketing do 4º trimestre', 'A fazer', 'Atualizar a página de preços', NULL, 'baixa', NULL, NULL),

  ('Marketing do 4º trimestre', 'Em andamento', 'Newsletter de outubro', NULL, 'media', date('now', 'localtime'), 'teste5@exemplo.com'),
  ('Marketing do 4º trimestre', 'Em andamento', 'Campanha de Black Friday', 'Definir descontos, banners e e-mails de divulgação', 'alta', date('now', 'localtime', '+20 days'), 'teste1@exemplo.com'),

  ('Marketing do 4º trimestre', 'Concluído', 'Relatório de resultados do 3º trimestre', NULL, 'media', date('now', 'localtime', '-2 days'), 'teste1@exemplo.com'),
  ('Marketing do 4º trimestre', 'Concluído', 'Revisar perfis nas redes sociais', NULL, 'baixa', date('now', 'localtime', '+1 days'), 'teste2@exemplo.com')
)
INSERT INTO tarefas (coluna_id, titulo, descricao, prioridade, prazo, responsavel_id, concluido_em)
SELECT c.id,
       v.titulo,
       v.descricao,
       v.prioridade,
       v.prazo,
       u.id,
       CASE WHEN c.tipo = 'fim' THEN date('now', 'localtime') END
  FROM v
  JOIN quadros q ON q.nome = v.quadro
  JOIN colunas c ON c.quadro_id = q.id AND c.nome = v.coluna
  LEFT JOIN usuarios u ON u.email = v.responsavel;

COMMIT;

