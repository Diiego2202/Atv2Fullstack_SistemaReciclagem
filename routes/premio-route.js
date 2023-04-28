const express = require('express');
const bodyParser = require('body-parser');
const premioController = require('../controller/premio-controller');

const router = express.Router();

//habilita o tratamento de requisições no formato JSON
router.use(bodyParser.json());

module.exports = router;


