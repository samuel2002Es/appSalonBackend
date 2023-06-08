import express from "express" //ESM
/* se le pone js por que no es un servicio instalado sino que yo lo cree */
import servicesRoutes from './routes/servicesRoutes.js'
import {db} from './config/db.js'

//dotenv nos permite crear variables de entorno de forma sencilla
import * as dotenv from 'dotenv'

// Variables de entorno
dotenv.config()

//configurar la app
const app = express()

//conectar a DB
db()

//definir una ruta usamos .use porque queremos un middelware es un codigo que se ejecuta en todas las peticiones
//ante cualquier peticion en /services ejecuta lo que hay en servicesRoutes
app.use('/api/services', servicesRoutes)

//definir un puerto
//prcess.env seria una variable de nuestro hosting, ahora bien sin no hay toma el puerto 4000
const PORT = process.env.PORT || 4000

//arrancar la app
app.listen(PORT, ()=>{
    console.log(`El servidor se esta ejecutendo en el puerto: ${PORT} `)
})
console.log(process.env.MONGO_URI)
console.log(process.env.USERS)
