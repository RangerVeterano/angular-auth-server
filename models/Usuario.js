const { Schema, model } = require("mongoose");

//Estamos creando el modelo de la base de datos
const UsuarioSchema = Schema({
    //Especificamos los campos que se van a tener
    name: {
        type: String, //indicamos el tipo de variable que va a ser
        required: true //indicamos que es un campo requerido
    },
    email: {
        type: String,
        required: true,
        unique: true //indicamos que tiene que ser un campo unico
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('Usuario', UsuarioSchema);