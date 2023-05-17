const express = require('express');
const bodyParser = require('body-parser');
const reciclagemController = require('../controller/reciclagem-controller');
const usuarioController = require('../controller/usuario-controller');

const router = express.Router();

//habilita o tratamento de requisições no formato JSON
router.use(bodyParser.json());

//Cria uma Reciclagem
router.post('/reciclagem/:id', async(req, res) =>{
    const usuario = await usuarioController.obterUsuario(req.params.id);
    console.log(req.params.id);
    console.log(usuario);
    const novo = await reciclagemController.criarReciclagem(req.params.id, req.body.item, req.body.imagem, req.body.peso, req.body.pontos);
    console.log(novo);
    console.log(usuario._id);
    res.json({resultado: 'Reciclagem Cadastrada!!!', reciclagem: novo});
});

router.get('/usuario/:id', async(req, res) => {
    const usuario = await usuarioController.obterUsuario(req.params.id);
    if(usuario){
        res.json({resultado: 'Usuário encontrado!!!', usuario: usuario});
    } else{
        res.status(404).json({ resultado: 'ERRO!! Usuário não encontrado!' });
    }
});

//Lista todos os itens reciclados de um usuário
router.get('/reciclagem/:id', (req, res) => {
    const id = req.params._id;
    res.json({resultado: 'Reciclagem encontrada!!!', reciclagem: reciclagemController.obterReciclagem(id)});
});

//Retorna o total de pontos e pesos de itens reciclados pelo usuário


//Subtrai 1 da quantidade total disponível de um prêmio


module.exports = router;


