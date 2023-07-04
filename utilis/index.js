import mongoose from "mongoose"
import jwt from 'jsonwebtoken'

function validateObjectId(id,res){
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('No es un objectId valido')

        return res.status(400).json({
            msg: error.message
        })
    }
}

function handleNotFoundError(message,res){
    const error = new Error(message)
        return res.status(404).json({
            msg: error.message
        })
}

//para generar un id unico
const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)


//generate jwt token
const generateJWT = (id) => {
    console.log("desde jwt",id)
    //el firmar o sign toma tres datos: payload=datos en la firma, llave privada , duracion
    //3d = tres dias
    //1h = hora
    const token = jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn: '1h'
    })
    return token
}
export {
    validateObjectId,
    handleNotFoundError,
    uniqueId,
    generateJWT
}