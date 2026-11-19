require('dotenv').config();
const express = require('express');
const rotaInexistente = require('./middlewares/rotaInexistente');
const erro = require('./middlewares/erro');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
require('./routers')(app);
app.use(rotaInexistente);
app.use(erro);
app.listen(PORT, () => console.log(`API Rodando na porta ${PORT}`));
