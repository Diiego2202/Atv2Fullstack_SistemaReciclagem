const express = require('express');
const bodyParser = require('body-parser');
const premioController = require('../controller/premio-controller');

const router = express.Router();

//habilita o tratamento de requisições no formato JSON
router.use(bodyParser.json());

//Cria um Premio
router.post('/premio', (req, res) =>{
    const novo = premioController.criarPremio(req.body.descricao, req.body.pontos, req.body.quantidade);
    res.json({resultado: 'Premio Cadastrado!!!', premio: novo});
})

//Retorna um Premio
router.get('/premio/:id', (req, res) => {
    const id = req.params._id;
    res.json({resultado: 'Premio encontrado!!!', premio: premioController.obterPremio(id)});
});

//Atualiza um Premio


//Remove um Premio


//Lista todos os premios


//lista todos os prêmios disponíveis de acordo com os pontos necessários


module.exports = router;


