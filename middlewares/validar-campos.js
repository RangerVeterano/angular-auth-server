const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {

    //Guardamos una constante de los posibles erroes del express-validators
    const errors = validationResult(req);

    //si los erroes no estan vacios se lanza una peticion 400 (Peticion mala)
    if (!errors.isEmpty()) {

        //Se devuelve un error con los detalles del mensaje
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    //con esta instruccion indicamos que se sigan los valodadores
    next();
}


//Exportamos nuestro middleware
module.exports = {
    validarCampos
}