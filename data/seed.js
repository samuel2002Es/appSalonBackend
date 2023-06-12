import dotenv from 'dotenv'
import { db } from "../config/db.js"
import Services from '../models/Services.js'
import { services } from './beautyServices.js'
import colors from 'colors'

//dotenv para que reconozca nuestros valores de .evn y db para traer la configuracion y hacer coneccion con la base de datos
dotenv.config()
await db()

async function seedDB(){
    try {
        console.log("desde seedDB")
        //sentencia para ingresar muchos servicios, mongo espera un arreglo, tal y como lo tenemos
        await Services.insertMany(services)
        console.log(colors.green.bold("se agregaron los datos correctamente"))
        //finalizamos el proceso con algo correcto y por eso es 0
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
async function clearDB(){
    try {
        console.log("desde cleardDB")
        //sentencia para eliminar muchos servicios, 
        await Services.deleteMany()
        console.log(colors.red.bold("se eliminaron los datos correctamente"))
        //finalizamos el proceso con algo correcto y por eso es 0
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
//argv es argument vector y es una forma que se tiene para pasar o escribir comandos el el bash
console.log(process.argv)

if (process.argv[2] === '--import') {
    seedDB()
}else{
    clearDB()
}