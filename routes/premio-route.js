const express = require('express');
const bodyParser = require('body-parser');
const premioController = require('../controller/premio-controller');

const router = express.Router();

//habilita o tratamento de requisições no formato JSON
router.use(bodyParser.json());

//Cria um Premio
router.post('/premio', async(req, res) =>{
    const novo = await premioController.criarPremio(req.body.descricao, req.body.pontos, req.body.quantidade);
    if (novo) {
        res.json({status: 200 , premio: novo});
    } else res.json({status: 400 , premio: novo});
});

//Retorna um Premio
router.get('/premio/:id', async(req, res) => {
    const premio = await premioController.obterPremio(req.params.id);
    if(premio){
        res.json({resultado: 'Premio encontrado!!!', premio: premio});
    } else{
        res.status(404).json({ resultado: 'ERRO!! Premio não encontrado!' });
    }
});

//Atualiza um Premio
router.put('/premio/:id', async(req, res) =>{
    const att = await premioController.atualizarPremio(req.params.id, req.body.descricao, req.body.pontos, req.body.quantidade);
    if(att){
        res.json({status: 200, premio: att});
    } else{
        res.status(404).json({ status: 400 });
    }
});

//Remove um Premio
router.delete('/premio/:id', async(req, res) => {
    const premio = await premioController.deletarPremio(req.params.id);
    if(premio){
        res.json({status: 200, premio: premio});
    } else{
        res.status(404).json({ status: 400 });
    }
});

//Lista todos os premios
router.get('/premio', async(req, res) => {
    const premios = await premioController.obterTodosPremios();
    if(premios){
        res.json({resultado: 'Premio encontrado!!!', premios: premios});
    } else{
        res.status(404).json({ resultado: 'ERRO!! Não existem premio cadastrados!' });
    }
});

//lista todos os prêmios disponíveis de acordo com os pontos necessários
router.get('/premio/disponivel/:pontos', async(req, res) => {
    const premios = await premioController.obterPremiosPontos(req.params.pontos);
    if(premios){
        res.json({resultado: 'Premio encontrado!!!', premios: premios});
    } else{
        res.status(404).json({ resultado: 'ERRO!! Não existem premios com essa quantidade de pontos!' });
    }
});

router.post('/premio/:idPremio/usuario/:idUsuario', async(req, res) =>{
    const novo = await premioController.atribuirPremio(req.params.idPremio, req.params.idUsuario);
    if (novo) {
        res.json({ status: novo });
    } else res.json({ status: 400 });
});

module.exports = router;


