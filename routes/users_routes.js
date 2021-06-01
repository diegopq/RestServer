const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/users_controller");
//db validators
const {
  roleValidator,
  emailValidator,
  userIdValidator,
} = require("../helpers/db-validators");
const { reqValidator } = require("../middlewares/req-validator");

const router = Router();

router.get("/", getUsers);

//el segundo parametro son los middlewares que se van a ejecutar en ese endpoint,
//si se mandan varios se ponen en un arreglo, el tercer argumento es el controlador
//los middlewares se ejecutan en orden antes del controlador
router.post(
  "/",
  //middelwares
  [
    //se valida los campos que son obligatorios en el modelo de mongoose
    check("name", "El nombre es obligatorio").notEmpty(),
    check("email", "Email inválido").notEmpty().isEmail(),
    check("password", "Password obligatorio y minimo 6 digitos")
      .notEmpty()
      .isLength({ min: 6 }),
    check("role", "El rol es obligatorio").notEmpty(),
    //validacion customizada para checar que el role y el email exista en la base de datos
    check("email").custom(emailValidator),
    check("role").custom(roleValidator),

    //checa si hay alguna validacion anterior de los campos tuvo error y si es asi
    //regresa un 400 con el error indicado
    reqValidator,
  ],
  postUsers
);

//leer parametros de segmento
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(userIdValidator),
    reqValidator,
  ],
  putUsers
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(userIdValidator),
    reqValidator,
  ],
  deleteUsers
);

router.patch("/", patchUsers);

module.exports = router;
