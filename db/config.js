const mongoose = require("mongoose");

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.BD_CNN, {
            useUnifiedTopology: true,
        })

        console.log('Base de datos Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos');
    }
}

//Para poder hacer uso de la funcion la tenemos que exportar
module.exports = {
    dbConnection
}