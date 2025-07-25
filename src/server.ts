import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";

// Aqui o instancio la bd porque si no creo que no jala     
async function connectionDB() {
    try {
        await db.authenticate()
        db.sync() 
        console.log(colors.rainbow("Conexion exitosa")); 
    } catch (error) {
        // TODO: No se puede ejecutar esta linea en pruebas por ahora
        //console.log(colors.white.bgRed.bold("Hubo un error al conectar"));
    }   
}
connectionDB()
//instancia del servidor
const server = express()
//Leer datos de formularios
server.use(express.json())

server.use('/api/products',router)
export default server