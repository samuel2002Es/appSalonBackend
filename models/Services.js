import mongoose, { mongo } from "mongoose";

//Definimos Schema
//la forma que tienen los datos se le llama schema https://mongoosejs.com/docs/schematypes.html
const servicesSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true//con trim eliminamos espcaios al inicio y al final
        //default: "samuel espinoza"
        //unique: true para que sea un valor unico y no repetible
    },
    price:{
        type: Number,
        require: true,
        trim: true
    }
})

//Definimos modelo
const Services = mongoose.model('Services', servicesSchema)
export default Services