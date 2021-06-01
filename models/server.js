
const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/users_routes');
const { dbConnection } = require('../db/config_db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //conexion a bd
        this.conectDB();

        //Middleware: funciones que siempre se van a ejecutar
        this.middlewares();

        //rutas de la aplicación
        this.routes();
    }


    async conectDB() {
        await dbConnection();
    }


    middlewares() {

        //cors
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en el puerto:', this.port);
        });
    }


}



module.exports = Server;