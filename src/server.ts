import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import swaggerUi from 'swagger-ui-express';

// Aqui o instancio la bd porque si no creo que no jala     
export async function connectionDB() {
    try {
        await db.authenticate()
        db.sync() 
        console.log(colors.rainbow("Conexion exitosa")); 
    } catch (error) {
        console.log("Hubo un error al conectar");
    }   
}
connectionDB()
//instancia del servidor
const server = express()
//Leer datos de formularios
server.use(express.json())

server.use('/api/products',router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))
export default server
