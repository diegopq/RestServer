
const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/users');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        //Middleware: funciones que siempre se van a ejecutar
        this.middlewares();

        //rutas de la aplicación
        this.routes();
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