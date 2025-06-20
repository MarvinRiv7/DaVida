const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config()
const cors = require('cors')



//Crear el servidor 
const app = express();

//DB
dbConnection()

app.use(cors())

//Directorio publico
app.use(express.static('public'))

app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'))


//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});