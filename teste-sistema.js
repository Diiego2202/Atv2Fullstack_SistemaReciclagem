const mongoose = require('mongoose');
const premioController = require ('./controller/premio-controller');
const usuarioController = require('./controller/usuario-controller');
const reciclagemController = require('./controller/reciclagem-controller');

const uri = "mongodb+srv://diiego2202:2202@cluster0.opgdhek.mongodb.net/CidadeVerde?retryWrites=true&w=majority";

mongoose.connect(uri).then(async (conn) => {

    //CRUD Usuario
    //const ret = await usuarioController.criarUsuario('User2', '321', 20, 200, 200);
    //const ret = await usuarioController.atualizarUsuario('642893a8e96134ae60fa3fb9', 'User2 att', 'senha att', 1, 1, 1);
    //const ret = await usuarioController.obterUsuario('6428939c3cc6c4b69fa27a59');
    //const ret = await usuarioController.deletarUsuario('642893a8e96134ae60fa3fb9');

    //CRUD Reciclagem
    //const ret = await reciclagemController.criarReciclagem("642893a8e96134ae60fa3fb9", 'Caixa de leite', 'foto2', 5.3, 20);
    //const ret = await reciclagemController.atualizarReciclagem('642896634e92ac0655828e9e', 'Caixa de leite att', 'foto2 att', 1, 1);
    const ret = await reciclagemController.obterReciclagem('6428960e053352f532ed00de');
    //const ret = await reciclagemController.deletarReciclagem('642896634e92ac0655828e9e');

    //CRUD Premio
    //const ret = await premioController.criarPremio('Desconto IPTU', '123', 1000, 5);
    //const ret = await premioController.atualizarPremio('642a0fc4e536c9ef0e67dca2', 'Desconto IPTU att', 1, 1);
    //const ret = await premioController.obterPremio('642a221dc7da4a5b4b57f5e0');
    //const ret = await premioController.deletarPremio('642a21f900567ff188f7241f');
    


    console.log(ret);

})