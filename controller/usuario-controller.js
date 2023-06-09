const mongoose = require('mongoose');
const Usuario = require('../model/usuario');
const jsonwebtoken = require('jsonwebtoken');

const criarUsuario = async (username, senha) => {
    const usuario = new Usuario({username: username, senha: senha, pontos: 0, latitude: 0, longitude: 0});
    const ret = await usuario.save();
    return ret;
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
        return usuario;
        
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

const login = async (username, senha) => {
    const user = await Usuario.findOne({username: username, senha: senha});
    if (user) {
        if (senha === user.senha) {
            return {user};
        }else {
            return null;
        }
    } else {
        return null;
    }
}

module.exports.criarUsuario = criarUsuario;
module.exports.atualizarUsuario = atualizarUsuario; 
module.exports.obterUsuario = obterUsuario;
module.exports.deletarUsuario = deletarUsuario;
module.exports.login = login;