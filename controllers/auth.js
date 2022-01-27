const { response } = require('express');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

//igualamos el res al tipo response para poder tener las ayudas de visual studio code
const crearUsuario = async (req, res = response) => {

    // Podemos desestructurar los datos recibidos del body
    const { email, password, name } = req.body;

    try {

        //Verificar el email

        const usuario = await Usuario.findOne({ email: email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe con ese email"
            });
        }

        //Crear usuaio con el modelo
        const dbUser = new Usuario(req.body);

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);//Se pueden especificar las veces que se hace segura la contraseña
        dbUser.password = bcrypt.hashSync(password, salt); //Encriptamos la contraseña con la cantidad de veces que queremos

        //Generar el json web token
        const token = await generarJWT(dbUser.id, name);

        //Crear usuario en la base de datos
        await dbUser.save();

        //Generar la respuesta exitosa

        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: name,
            email,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        });
    }

}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const dbUser = await Usuario.findOne({ email: email })

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario o contraseña no validos"
            })
        }

        //Confiarmar si el password es igual
        const validPassword = bcrypt.compareSync(password, dbUser.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña no es correcta"
            })
        }

        //Generar el json web token
        const token = await generarJWT(dbUser.id, dbUser.name);

        //Respuesta del servidor
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email,
            token
        })

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const renovarToken = async (req, res = response) => {

    const { uid, name } = req;

    //generamos un nuevo jwt
    const token = await generarJWT(uid, name);

    //leemos la base de datos para conseguir el email del usuario
    const dbUser = await Usuario.findById(uid)

    return res.json({
        ok: true,
        uid,
        name,
        email: dbUser.email,
        token
    });
}

//Exportamos todos los modulos que necesitamos
module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
};