//se declaran constantes y variables de forma global

//configura el puerto de la aplicacion, depende si esta en producción o en desarrollo
//la variable PORT existe cuando esta en produccion, si no existe se le da el valor de 8080
process.env.PORT = process.env.PORT || 8080;