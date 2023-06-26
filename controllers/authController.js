import User from '../models/User.js'

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
        await user.save()
        res.json({
            msg: 'El usuario se creo correctamente, revisa tu email'
        })
    } catch (error) {
        console.log(error) 
    }
}
export {
    register
}