const express = require('express');
const bodyParser = require('body-parser');
const reciclagemController = require('../controller/reciclagem-controller');

const router = express.Router();

//habilita o tratamento de requisições no formato JSON
router.use(bodyParser.json());

module.exports = router;


