const mongoose = require('mongoose');
const Usuario = require('../model/usuario');

const criarUsuario = async (nome, senha, pontos, latitude, longitude) => {
    const usuario = new Usuario({nome: nome, senha: senha, pontos: pontos, latitude: latitude, longitude: longitude});
    return await usuario.save();
}

const atualizarUsuario = async (usuarioId, nome, senha, pontos, latitude, longitude) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const usuario = await Usuario.findById(usuarioId).exec();
        if(usuario){
            const usuario = await Usuario.updateOne({_id: usuarioId}, {$set: {nome: nome, senha: senha, pontos: pontos, latitude: latitude, longitude: longitude}});
            await session.commitTransaction();
            return usuario;
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

const obterUsuario = async (usuarioId) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const usuario = await Usuario.findById(usuarioId).exec();
        if(usuario){
;
            return{
                nome: usuario.nome,
                senha: usuario.senha,
                pontos: usuario.pontos,
                latitude: usuario.latitude,
                longitude: usuario.longitude,
                reciclagem: usuario.reciclagem
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

const deletarUsuario = async (usuarioId) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const usuario = await Usuario.findById(usuarioId).exec();
        if(usuario){
            const usuario = await Usuario.deleteOne({_id: usuarioId});
            await session.commitTransaction();
            return usuario;
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

module.exports.criarUsuario = criarUsuario;
module.exports.atualizarUsuario = atualizarUsuario; 
module.exports.obterUsuario = obterUsuario;
module.exports.deletarUsuario = deletarUsuario;