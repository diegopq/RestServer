const Role = require("../models/role");
const Usuario = require("../models/usuario");

//valida que el rol exista en la bd
const roleValidator = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(
      `El rol ${role} no esta registrado en la base de datos por lo que no es permitido`
    );
  }
};

//valida que el email no exista
const emailValidator = async (email = "") => {
  const emailExist = await Usuario.findOne({ email });
  if (emailExist) {
    throw new Error(`El correo ${email} se registro anteriormente`);
  }
};

//valida si existe un usuario con ese id
const userIdValidator = async (id) => {
  const existUser = await Usuario.findById(id);
  if (!existUser) {
    throw new Error("No existe ningun usuario con ese id");
  }
};

module.exports = { roleValidator, emailValidator, userIdValidator };
