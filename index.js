const express = require('express');
const cors = require('cors');
const path = require('path'); //Este es un paquete de node
const { dbConnection } = require('./db/config');
require('dotenv').config(); //con esto le indicamos que carge nuestra variable del .env

// console.log(process.env);

//Crear el servidor/aplicacion de express
const app = express();

//conexion a base de datos
dbConnection()

//Directorio publico
app.use(express.static('public'));

//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json())

// app.get('/', (req, res) => {
//     //req es la peticion
//     //res es la respuesta
//     //podemos especificar el tipo de respuesta con el .status()
//     res.json({
//         ok: true,
//         msg: 'Todo ha salido bien'
//     });
// });

//rutas
//Las rutas que se encuentran dentro del archivo auth van a tener por delante /api/auth
app.use('/api/auth', require('./routes/auth'));

//Manejas todas las otras rutas 
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

//Levantamos el servidor y especificamos en que puerto lo queremos
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});