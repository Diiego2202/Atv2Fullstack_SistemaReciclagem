const express = require('express');
const bodyParser = require('body-parser');
const usuarioController = require('../controller/usuario-controller');

const router = express.Router();

//habilita o tratamento de requisições no formato JSON
router.use(bodyParser.json());

//Cria um usuario
router.post('/usuario', (req, res) =>{
    const novo = usuarioController.criarUsuario(req.body.username, req.body.senha, req.body.pontos, req.body.latitude, req.body.longitude);
    res.json({resultado: 'Usuario Cadastrado!!!', usuario: novo});
})

//Retorna um usuário
router.get('/usuario/:id', (req, res) => {
    const id = req.params._id;
    res.json({resultado: 'Usuário encontrado!!!', usuario: usuarioController.obterUsuario(id)});
});

//Atualiza um usuário
router.put('/usuario/:id', (req, res) =>{
    const id = req.params._id;
    const att = usuarioController.atualizarUsuario(id, req.body.username, req.body.senha, req.body.pontos, req.body.latitude, req.body.longitude);
    res.json({resultado: 'Usuario atualizado!!!', usuario: att});
})

//Remove um usuário


//Efetua o login do usuário
// router.post('/usuario/login/', (req, res) => {
//     if(usuarioController.login(req.body.username, req.body.senha)) {
//         res.json({resultado: 'Login OK!'});
//     } else res.status(401).json({resultado: 'Usuário / Senha inválidos!'});
// });


// router.put('/usuario/novasenha/:username', (req, res) => {
//     const username = req.params.username;
//     const novaSenha = req.body.senha;
//     console.log(username);
//     if(usuarioController.alterarSenha(username, novaSenha)){
//         res.json({resultado: 'Senha alterada com sucesso'});
//     } else res.status(400).json({resultado: 'Problemas para alterar a senha!'});
// })

module.exports = router;


