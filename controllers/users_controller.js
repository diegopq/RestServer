const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const getUsers = async (req = request, res = response) => {
  //obtener los query params
  const { q, nombre, page = 1, limit = 5, from = 0 } = req.query;

  //filtros de la busqueda en la db
  const dbQuery = {
    state: true,
  };
  //skip salta el numero de registros indicado
  //limit limita el numero de documentos regresados

  //ejecutar todos los procesos asincronos de manera simultanea y continua hasta que
  //ambos procesos finalicen, si una da error todas dan error
  const [total, users] = await Promise.all([
    Usuario.countDocuments(dbQuery),
    Usuario.find(dbQuery).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

//Crear usuario
const postUsers = async (req = request, res = response) => {
  //obtiene los datos del body
  const { name, email, password, role } = req.body;
  const usuario = new Usuario({ name, email, password, role });

  //si el correo existe
  //   const existEmail = await Usuario.findOne({ email });
  //   if (existEmail) {
  //     return res.status(400).json({
  //       msg: "El correo se registro anteriormente",
  //     });
  //   }

  //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save(); //graba el registro en la bd
  res.json({
    msg: "usuario creado en DB",
    usuario,
  });
};

//Actualizar usuario
const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...resto } = req.body;
  //si se desea actualizar la contraseña
  if (password) {
    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: `Usuario ${usuario.id} actualizado`,
    usuario,
  });
};

const patchUsers = (req = request, res = response) => {
  res.json({
    msg: "metodo patch - controlador",
  });
};

const deleteUsers = async (req = request, res = response) => {
  const { id } = req.params;
  console.log(id);

  //borrar fisicamente el usuario (no recomendado)
  // const user = await Usuario.findByIdAndDelete(id);

  //desactivar usuario en la base de datos
  const user = await Usuario.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: `Usuario ${id} borrado`,
    user,
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
