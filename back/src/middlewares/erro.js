const { ZodError } = require('zod');

const UNIQUE_EMAIL = 'UNIQUE constraint failed: usuarios.email';

const mensagemDoZod = ({ issues }) =>
  issues
    .map(({ path, message }) => (path.length ? `${path.join('.')}: ${message}` : message))
    .join('; ');

const responder = (res, status, message) => res.status(status).json({ status: 'error', message });

module.exports = (error, _req, res, _next) => {
  if (error instanceof ZodError) return responder(res, 400, mensagemDoZod(error));
  if (error.message === UNIQUE_EMAIL) return responder(res, 409, 'E-mail já cadastrado');
  if (error.status >= 400 && error.status < 500) return responder(res, error.status, error.message);

  console.error(error);
  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
    error: error.message
  });
};
