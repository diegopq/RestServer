const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Conexion a db correcta");
  } catch (e) {
    console.log(e);
    throw new Error("Error en la conexión con la bd");
  }
};

module.exports = {
  dbConnection,
};
