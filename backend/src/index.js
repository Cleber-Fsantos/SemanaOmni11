const express = require('express');
const cors = require('cors');
const routes = require('./routes');


const app = express();

app.use(cors(/*{
    origin: 'http://meuapp.com'
}*/));
app.use(express.json());;
/*
*Rota / Recurso
*
*Método HTTP:
*
*GET: Busccar uma informação do back-end
*POST: Criar uma informação no back-end
*PUT: Alterar uma informação no back-end
*DELETE: Deletar uma informação no babck-end
*
*Tipos de Parametros
*
*Query: Paramnetros nomeados enviados na rota após "?" (Filtros, paginação)
*Route Params: Parâmetros utilizados para identificar recursos
*Request Body: Corpo da requisição

*BANCO DE DADOS
*SQL: MySQL, SQLite, PostgreSQL,Oracle MS SQL Server
*NoSQL: MongoDB, CouchDB, etc

*Driver: Select * FROM users
*Query Builder: table('users').select('*').where()
*/
app.use(routes);


app.listen(3333);