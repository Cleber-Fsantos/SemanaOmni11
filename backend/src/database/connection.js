const knex = require('knex');
const configuration = require('../../knexfile');
//exportanto a conexao de Devolupemnto dentro do knexfile
const connection  = knex(configuration.development);

module.exports = connection;