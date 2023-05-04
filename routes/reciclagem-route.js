const express = require('express');
const bodyParser = require('body-parser');
const reciclagemController = require('../controller/reciclagem-controller');
const usuarioController = require('../controller/usuario-controller');

const router = express.Router();

//habilita o tratamento de requisições no formato JSON
router.use(bodyParser.json());

//Cria uma Reciclagem
router.post('/reciclagem/:id', (req, res) =>{
    const id = req.params._id;
    const usuario = usuarioController.obterUsuario(id);
    const novo = reciclagemController.criarReciclagem(usuario, req.body.item, req.body.imagem, req.body.peso, req.body.data, req.body.pontos);
    res.json({resultado: 'Reciclagem Cadastrado!!!', reciclagem: novo});
})

//Lista todos os itens reciclados de um usuário
router.get('/reciclagem/:id', (req, res) => {
    const id = req.params._id;
    res.json({resultado: 'Reciclagem encontrada!!!', reciclagem: reciclagemController.obterReciclagem(id)});
});

//Retorna o total de pontos e pesos de itens reciclados pelo usuário


//Subtrai 1 da quantidade total disponível de um prêmio


module.exports = router;


