import express from 'express'
import {  register, verifyAccount,login,user } from '../controllers/authController.js'
import authMiddelware from '../middelware/authMiddleware.js'

const router = express.Router()

//Rutas de autenticación y registro de usuarios
router.post('/register',register)

//http://localhost:4000/api/auth      /verify/1h3srrrjll51j9hf41vo
router.get('/verify/:token',verifyAccount)

router.post('/login',login)

//area pribada -requiere un JWT
//un middleware es el seguimento para ejecutar una acction, primero establecemos la ruta despues ejecuta authmiddelware, y depues va a user
router.get('/user',authMiddelware,user)


export default router
