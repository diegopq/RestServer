const { response, request } = require('express');


const getUsers = (req = request, res = response) => {

    //obtener los query params
    const {q,nombre, page = 1, limit = 10} = req.query;
    res.json({
        msg: 'metodo get - controlador',
        q, nombre, page, limit
    });
};

const postUsers = (req, res = response) => {

    const { nombre, edad} = req.body;
    res.json({
        msg: 'metodo post - controlador',
        nombre,
        edad
    });
}

const putUsers = (req, res = response) => {

    const id = Number.parseInt(req.params.id);

    res.json({
        msg: 'metodo put - controlador',
        id

    });
}

const patchUsers = (req, res = response) => {
    res.json({
        msg: 'metodo patch - controlador'
    });
}

const deleteUsers = (req, res = response) => {
    res.json({
        msg: 'metodo delete - controlador'
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}