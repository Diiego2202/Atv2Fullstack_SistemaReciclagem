const mongoose = require('mongoose');
const Usuario = require('../model/usuario');
const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

var usuarios = [];
const criarUsuario = async (username, senha, pontos, latitude, longitude) => {
    const usuario = new Usuario({username: username, senha: senha, pontos: pontos, latitude: latitude, longitude: longitude});
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

const login = (username, senha) => {
    if (usuarios[username]) {
        const valido = bcryptjs.compareSync(senha, usuarios[username].senha);
        if (valido) {
            const token = jsonwebtoken.sign({username: username}, process.env.SEGREDO);
            return {valido: true, token: token};
        } else return {valido: false};
    } else {
        return {valido: false};
    }
}

module.exports.criarUsuario = criarUsuario;
module.exports.atualizarUsuario = atualizarUsuario; 
module.exports.obterUsuario = obterUsuario;
module.exports.deletarUsuario = deletarUsuario;
module.exports.login = login;