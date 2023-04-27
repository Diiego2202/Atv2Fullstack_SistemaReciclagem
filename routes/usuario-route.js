const express = require('express');
const bodyParser = require('body-parser');
const usuarioController = require('../controllers/usuario-controller');

const router = express.Router();

//habilita o tratamento de requisições no formato JSON
router.use(bodyParser.json());

//Cria um usuario
router.post('/usuario', (req, res) =>{
    const novo = usuarioController.novoUsuario(req.body.username, req.body.senha);
    res.json({resultado: 'Usuario Cadastrado!!!', usuario: novo});
})

//Retorna um usuário
router.get('/usuario/:id', (req, res) => {
    const id = req.params._id;
    res.json(usuarioController.obterUsuario(id));
});

//validar login e senha
router.post('/usuario/login/', (req, res) => {
    if(usuarioController.login(req.body.username, req.body.senha)) {
        res.json({resultado: 'Login OK!'});
    } else res.status(401).json({resultado: 'Usuário / Senha inválidos!'});
});

router.put('/usuario/novasenha/:username', (req, res) => {
    const username = req.params.username;
    const novaSenha = req.body.senha;
    console.log(username);
    if(usuarioController.alterarSenha(username, novaSenha)){
        res.json({resultado: 'Senha alterada com sucesso'});
    } else res.status(400).json({resultado: 'Problemas para alterar a senha!'});
})

module.exports = router;


