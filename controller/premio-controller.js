const mongoose = require('mongoose');
const Premio = require('../model/premio');
const Usuario = require('../model/usuario');

const criarPremio = async (descricao, pontos, quantidade) => {
    const premio = new Premio({descricao: descricao, pontos: pontos, quantidade: quantidade, usuario: null});
    return await premio.save();
}

const atualizarPremio = async (premioId, descricao, pontos, quantidade) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const premio = await Premio.findById(premioId).exec();
        if(premio){
            const premio = await Premio.updateOne({_id: premioId}, {$set: {descricao: descricao, pontos: pontos, quantidade: quantidade}});
            await session.commitTransaction();
            return premio;
        }
        
    } catch (error) {
        console.log(error);
        session.abortTransaction();
    } finally {
        if (session) {
            session.endSession();
        }
    }
}

const obterPremio = async (premioId) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const premio = await Premio.findById(premioId).exec();
        return premio;
        
    } catch (error) {
        console.log(error);
        session.abortTransaction();
    } finally {
        if (session) {
            session.endSession();
        }
    }
}

const obterTodosPremios = async () => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const premio = await Premio.find().exec();
        return premio;
        
    } catch (error) {
        console.log(error);
        session.abortTransaction();
    } finally {
        if (session) {
            session.endSession();
        }
    }
}

const obterPremiosPontos = async (pontos) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const premio = await Premio.find().exec();
        var premioFiltro = [];
        for (var i = 0; i < premio.length; i++){
            if(premio[i].pontos == pontos){
                premioFiltro.push(premio[i]);
            }
        }
        return premioFiltro;
        
    } catch (error) {
        console.log(error);
        session.abortTransaction();
    } finally {
        if (session) {
            session.endSession();
        }
    }
}

const deletarPremio = async (premioId) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const premio = await Premio.findById(premioId).exec();
        if(premio){
            const premio = await Premio.deleteOne({_id: premioId});
            await session.commitTransaction();
            return premio;
        }
        
    } catch (error) {
        console.log(error);
        session.abortTransaction();
    } finally {
        if (session) {
            session.endSession();
        }
    }
}

const atribuirPremio = async (premioID, usuarioID) => {   
    try{
        session = await mongoose.startSession();
        session.startTransaction();
        const premio = await Premio.findById(premioID).exec();
        const usuario = await Usuario.findById(usuarioID).exec();

        if(premio.usuario === null){
            await Premio.updateOne({_id: premioID}, {$set: {usuario: usuario, quantidade: premio.quantidade - 1}});
            await Usuario.updateOne({_id: usuarioID}, {$set: {pontos: usuario.pontos + premio.pontos}});
            await session.commitTransaction();
            return 200;
        }else{   
            premio.usuario.forEach ( async result => {
                if(result === usuario._id){
                    await Premio.updateOne({_id: premioID}, {$set: {usuario: usuario, quantidade: premio.quantidade - 1}});
                    await Usuario.updateOne({_id: usuarioID}, {$set: {pontos: usuario.pontos + premio.pontos}});
                    await session.commitTransaction();
                    return 200;
                }           
            });
        }      
        return 400;

    }catch (error){
        console.log(error);
    }
}

module.exports.criarPremio = criarPremio;
module.exports.atualizarPremio = atualizarPremio;
module.exports.obterPremio = obterPremio;
module.exports.obterTodosPremios = obterTodosPremios;
module.exports.obterPremiosPontos = obterPremiosPontos;
module.exports.deletarPremio = deletarPremio;
module.exports.atribuirPremio = atribuirPremio;