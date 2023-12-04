/* Imports */
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
require('../models/Pedido')
require('../models/Sorvete')
require('../models/User')
const verifToken = require('../Auth/VerificarToken')
const verifAdmin = require('../Auth/VerificarAdmin')

/* Models */
const Sorvete = mongoose.model('Sorvetes')
const Usuario = mongoose.model('users')
const Pedido = mongoose.model('pedidos')


/* Rota para inserir dados no banco */
router.get('/', verifToken, (req, res) => {
    let sorvetesIds = [];

    Sorvete.insertMany([
        { sabor: 'Morango', tamanho: 1, cobertura: 'Chocolate', fruta: 'Morango' },
        { sabor: 'Chocolate', tamanho: 2, cobertura: 'Caramelo', fruta: 'Banana' },
        { sabor: 'Côco', tamanho: 3, cobertura: 'Frocos', fruta: 'Mangona' },
        { sabor: 'Chocomenta', tamanho: 3, cobertura: 'Leite Compensado', fruta: 'Manga' },
        { sabor: 'Pitaya', tamanho: 1, cobertura: 'Azeide', fruta: 'Nenhuma' }
    ]).then((sorvetes) => {
        sorvetesIds = sorvetes.map(sorvete => sorvete._id.toString());
        return Usuario.insertMany([
            { nome: 'user1', email: 'user1@user1.com', senha: '123'},
            { nome: 'user2', email: 'user1@user2.com', senha: '123'},
            { nome: 'user3', email: 'user1@user3.com', senha: '123'},
            { nome: 'user4', email: 'user1@user4.com', senha: '123'},
            { nome: 'user5', email: 'user1@user5.com', senha: '123'}
        ]);
    }).then(() => {

        const pedidos = [
            { idVenda: 1, sorvetes: [sorvetesIds[0], sorvetesIds[1]], observacao: 'Pedido 1' },
            { idVenda: 2, sorvetes: [sorvetesIds[1], sorvetesIds[4]], observacao: 'Pedido 2' },
            { idVenda: 3, sorvetes: [sorvetesIds[3]], observacao: 'Pedido 3' },
            { idVenda: 4, sorvetes: [sorvetesIds[2], sorvetesIds[3], sorvetesIds[0]], observacao: 'Pedido 4' },
            { idVenda: 5, sorvetes: [sorvetesIds[2], sorvetesIds[3], sorvetesIds[2]], observacao: 'Pedido 5' }
        ];

        return Pedido.insertMany(pedidos);
    }).then(() => {
        res.status(200).json({ message: 'Dados inicializados e inseridos no banco com sucesso' })
    }).catch((error) => {
        console.error('Erro durante a execução:', error);
        res.status(500).json({ message: 'Erro interno no servidor', error })
    });
});


module.exports = router