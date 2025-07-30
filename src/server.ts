import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import swaggerUi from 'swagger-ui-express';
// Que trucazo no? DB_URL=postgresql://postgres2_sjnc_user:IqHk6pryPXXYcWkFS2hCtmlwrO1H7hEf@dpg-d1v8bva4d50c73dasct0-a.oregon-postgres.render.com/postgres2_sjnc?ssl=true |  PORT=4000
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

server.use('/api',router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))
export default server
