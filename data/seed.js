import dotenv from 'dotenv'
import { db } from "../config/db.js"
import Services from '../models/Services.js'
import { services } from './beautyServices.js'
dotenv.config()
await db()

async function seedDB(){
    try {
        console.log("desde seedDB")
        //sentencia para ingresar muchos servicios, mongo espera un arreglo, tal y como lo tenemos
        await Services.insertMany(services)
        console.log("se agregaron los datos correctamente")
        //finalizamos el proceso con algo correcto y por eso es 0
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
function clearDB(){
    console.log("desde clearDB")
}
//argv es argument vector y es una forma que se tiene para pasar o escribir comandos el el bash
console.log(process.argv)

if (process.argv[2] === '--import') {
    seedDB()
}else{
    clearDB()
}