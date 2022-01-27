const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, loginUsuario, renovarToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Crear un nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario);


//Login de usuario
//antes de la funcion y después de la ruta podemos añadir midlewares para realizar comprovaciones y otras cosas
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

//Validar y revalidar token
router.get('/renew', validarJWT,renovarToken);

//Exportamos nuestra variable, como se tiene que hacer con los paquetes de node
module.exports = router;