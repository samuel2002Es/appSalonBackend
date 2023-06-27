import express from 'express'
import {  register, verifyAccount,login } from '../controllers/authController.js'

const router = express.Router()

//Rutas de autenticación y registro de usuarios
router.post('/register',register)

//http://localhost:4000/api/auth      /verify/1h3srrrjll51j9hf41vo
router.get('/verify/:token',verifyAccount)

router.post('/login',login)

export default router
