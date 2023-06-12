import mongoose from 'mongoose'
import colors from 'colors'

export const db = async () => {
    try {
        const uri = process.env.MONGO_URI
        const db = await mongoose.connect(uri)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(colors.green.bgWhite.bold(`MongoDB se conecto correctamente ${url}`))
    } catch (error) {
        console.error(`Error: ${error.message}`)
        //si no hay coneccion con nuestra base de datos le decimos que queremos parar el programa, si lo paramos con un error ocupamos 1 y si queremos parar el programa sin errores utilizamos 0
        process.exit(1)
    }
}