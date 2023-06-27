import User from '../models/User.js'
import {sendEmailVerification} from '../emails/authEmailService.js'

const register = async (req, res)=>{
    //validaciones de campos
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({ msg: error.message })
    }
    const {email, password, name} = req.body
    //evitar registros duplicados
    const userExist = await User.findOne({email: email})
    if (userExist) {
        const error = new Error('Este correo ya ha sido registrado')
        return res.status(400).json({ msg: error.message })
    }

    //validar la extension del password
    const MIN_PASSWOR_LENGTH = 8 
    if (password.trim().length < MIN_PASSWOR_LENGTH) {
        const error = new Error(`El password debe contener ${MIN_PASSWOR_LENGTH} caracteres`)
        return res.status(400).json({ msg: error.message })
    }

    try {
        //si pasa la validacion de que hay algo guardamos el usuario
        const user = new User(req.body)
        const result = await user.save()
        const { name, email, token } = result
        sendEmailVerification({
            name: name,
            email: email,
            token: token
        })

        //console.log(result)
        res.json({
            msg: 'El usuario se creo correctamente, revisa tu email'
        })
    } catch (error) {
        console.log(error) 
    }
}

const verifyAccount = async (req, res)=>{
    //console.log(req.params.token)
    const { token } = req.params
    const user = await User.findOne({token})
    if(!user){
        const error = new Error('Hubo un error, token no valido')
        return res.status(401).json({ msg: error.message })
    }

    //si el token es valido, confirmar la cuenta
    try {
        user.verified = true,
        //para que el token deje de ser valido
        user.token = null
        await user.save()
        res.json({
            msg: "Usuario Confirmado Correctamente"
        })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res)=> {
    const {email,password} = req.body
    //Revisar que el usuario exista
    const user = await User.findOne({email})
    if(!user){
        const error = new Error('El usuario no existe')
        return res.status(401).json({ msg: error.message })
    }
    //revisar si el usuario confirmo su cuenta
    if (!user.verified) {
        const error = new Error('Tu cuenta no ha sido confirmada aun ')
        return res.status(401).json({ msg: error.message })
    }
    //Comprobar el password
    if (await user.checkPassword(password)) {
        return res.json({
            msg: "Usuario Autenticado"
        })
    }else{
        const error = new Error('El password es incorrecto')
        return res.status(401).json({ msg: error.message })
    }
    console.log("desde login")
}

export {
    register,
    verifyAccount,
    login
}