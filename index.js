const express = require('express');
const mongoose = require('mongoose');
const premioRoute = require ('./routes/premio-route');
const usuarioRoute = require('./routes/usuario-route');
const reciclagemRoute = require('./routes/reciclagem-route');

const uri = "mongodb+srv://diiego2202:2202@cluster0.opgdhek.mongodb.net/CidadeVerde?retryWrites=true&w=majority";

const app = express();

// habilita a rota para usuarios
app.use(usuarioRoute);

app.post('/alo', (req, res) => {
    res.send('Ola');
})

app.use((req, res) => {
    res.status(404).json({msg: "Endpoint inexistente!"})
})

mongoose.connect(URL).then(() => {
    app.listen(3000, () => console.log('Servidor iniciado...'));
}).catch((err) => console.log(err));