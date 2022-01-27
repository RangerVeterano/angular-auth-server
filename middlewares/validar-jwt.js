const { response } = require("express")
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {

    //leemos el token recibido en el header de la web
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'error en el token'
        })
    }

    try {

        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;

    } catch (error) {
        //El token no se pudo leer
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next(); //Todo Ok
}

module.exports = {
    validarJWT
}