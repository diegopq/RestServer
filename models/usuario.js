//modelo de la coleccion de usuarios en la bd
const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "El nombre es requerido"],
    },
    email: {
      type: String,
      require: [true, "El correo es obligatorio"],
      unique: true, // evita que el correo este duplicado
    },
    password: {
      type: String,
      require: [true, "La contraseña es obligatoria"],
    },
    img: {
      type: String,
    },
    role: {
      type: String,
      require: true,
      emun: ["ADMIN_ROLE", "USER_ROLE"],
    },
    state: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

//sobreescribir el metodo toJson para no mostrar la contraseña, la funcion tiene que ser
//una funcion normal con la referencia a la instancia creada usando this
UsuarioSchema.methods.toJSON = function () {
  //objeto referente al schema, se saca el parametro __V y password
  const { __v, password, ...user } = this.toObject();
  return user;
};

//mongoose usa el metodo model para crear la coleccion y le da el nombre en plural del primer parametro
//que recibe la funcion, este primer parametro es el nombre del modelo
module.exports = model("Usuario", UsuarioSchema);
