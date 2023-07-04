import jwt from "jsonwebtoken"
import User from '../models/User.js'
const authMiddelware = async (req,res,next)=>{
    //comprobar el envio de autorizacion
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //si hay token, validarlo 
        const token = req.headers.authorization.split(' ')[1]//para que quite lo de bearer
        try{
            //verificamos el token, pasando el token y pasando la llave
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //console.log(decoded)
            //como este es un middleware recuerda que primero van los headers, esto nos permite introducir en el body por asi decirlo el user
            req.user = await User.findById(decoded.id).select(
                "-password -verified -token -__v"
            )
            //console.log(user)
            next()
        }catch(err){
            const error = new Error('Token no valido')
            return res.status(403).json({msg: error.message})
        }
    }else{
        const error = new Error('Token no valido o inexistente')
        return res.status(403).json({msg: error.message})
    }
}
export default authMiddelware