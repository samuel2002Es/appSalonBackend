import mongoose from 'mongoose'

export const db = async () => {
    try {
        const uri = 'mongodb+srv://root:5bYVbaclGBOlQgIN@cluster0.3ajvdoi.mongodb.net/?retryWrites=true&w=majority'
        const db = await mongoose.connect(uri)
        console.log('se conecto correctamente')
    } catch (error) {
        console.error(`Error: ${error.message}`)
        //si no hay coneccion con nuestra base de datos le decimos que queremos parar el programa, si lo paramos con un error ocupamos 1 y si queremos parar el programa sin errores utilizamos 0
        process.exit(1)
    }
}