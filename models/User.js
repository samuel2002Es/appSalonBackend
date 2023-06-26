import mongose from 'mongoose'
import { uniqueId } from '../utilis/index.js'
import bcrypt from 'bcrypt'
const userSchema = mongose.Schema({
    name: {
        type:String,
        require: true,
        trim: true
    },
    password: {
        type:String,
        require: true,
        trim: true
    },
    email: {
        type:String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    token: {
        type:String,
        default: ()=> uniqueId(),
    },
    verified: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
})

//este pre es un hook que nos permite hacer algo justo antes de guardar en la base de datos ya que se hayan pasado las validaciones
userSchema.pre('save', async function (next){
    //un password ya hasheado no lo volvera a hashear
    if (!this.isModified('password')) {
        next()
    }
    //numero de seguridad de hasheado
    //esperamos que se genere el cifrado y luego esperramos que se junte con la contraseña para guardar
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
const User = mongose.model('User', userSchema)

export default User