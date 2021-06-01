const { validationResult } = require("express-validator");

const reqValidator = (req, res, next) => {
  //en caso de que algun campo de la peticion se marco como invalido en el
  //middleware de check en el archivo de rutas se regresa un 400 con el json de respuesta
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

module.exports = { reqValidator };
