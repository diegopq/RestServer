//requerimos el archivo de configuración
require("./config/config");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT; //la variable existe en el archivo de configuracion por lo que se puede tomar directamente

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//peticion para pedir los datos del usuario
app.get("/usuario", function(req, res) {
    res.json("Get usuario");
});

//el post se usa por lo general para crear registros
app.post("/usuario", (req, res) => {
    //se pueden obtener los datos que tenga la peticion en el body, para ello se usa el paquete bodyparser
    //el body aparece cuando el paquete bodyparser procese el payload que tenga la peticion
    let body = req.body;

    //validamos los datos enviados en el body para retornar un codigo de respuesta
    if (body.nombre === undefined) {
        //si ocurrio un error
        res.status(400).json({ ok: false, mensaje: "El nombre es necesario" });
    } else {
        //regresa un codigo 200 si se realizo todo bien
        res.json({ "Post usuario": body });
    }
});

//se usa para actualizar registros, si queremos recibir parametros en la url esos parametros se ponen seguidos de :
app.put("/usuario/", (req, res) => {
    //para recuperar los parametros si usa req
    let id = req.params.id;
    res.json("Put usuario");
});

//los delete sirven para borrar o desactivar registros
app.delete("/usuario", (req, res) => {
    res.json("delete usuario");
});
app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
});