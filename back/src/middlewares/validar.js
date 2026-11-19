const validar = ({ params, body }) => (req, _res, next) => {
  if (params) req.params = params.parse(req.params);
  if (body) req.body = body.parse(req.body ?? {});
  next();
};

module.exports = validar;
