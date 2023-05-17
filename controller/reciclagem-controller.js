const mongoose = require('mongoose');
const Usuario = require('../model/usuario');
const Reciclagem = require('../model/reciclagem');

const criarReciclagem = async (usuarioId, item, imagem, peso, pontos) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const usuario = await Usuario.findById(usuarioId).exec();
        if(usuario){
            let reciclagem = new Reciclagem({usuarioId: usuario._id, item: item, imagem: imagem, peso: peso, data: new Date(), pontos: pontos});
            reciclagem = await reciclagem.save({session: session});
            usuario.reciclagem.push(reciclagem);
            await usuario.save({session: session});
            await session.commitTransaction();
            return reciclagem;
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

const atualizarReciclagem = async (reciclagemId, item, imagem, peso, pontos) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const reciclagem = await Reciclagem.findById(reciclagemId).exec();
        if(reciclagem){
            const reciclagem = await Reciclagem.updateOne({_id: reciclagemId}, {$set: {item: item, imagem: imagem, peso: peso, pontos: pontos}});
            await session.commitTransaction();
            return reciclagem;
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

const obterReciclagem = async (reciclagemId) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const reciclagem = await Reciclagem.findById(reciclagemId).exec();
        if(reciclagem){
;
            return{
                usuario: reciclagem.usuario,
                item: reciclagem.item,
                imagem: reciclagem.imagem,
                peso: reciclagem.peso,
                data: reciclagem.data,
                pontos: reciclagem.pontos
            };

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

const deletarReciclagem = async (reciclagemId) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const reciclagem = await Reciclagem.findById(reciclagemId).exec();
        if(reciclagem){
            const reciclagem = await Reciclagem.deleteOne({_id: reciclagemId});
            await session.commitTransaction();
            return reciclagem;
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

module.exports.criarReciclagem = criarReciclagem;
module.exports.atualizarReciclagem = atualizarReciclagem;
module.exports.obterReciclagem = obterReciclagem;
module.exports.deletarReciclagem = deletarReciclagem;
