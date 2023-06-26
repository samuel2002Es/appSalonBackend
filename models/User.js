import mongose from 'mongoose'
import { uniqueId } from '../utilis/index.js'
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

const User = mongose.model('User', userSchema)

export default User