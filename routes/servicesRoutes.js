import express from 'express'
import { createService, getServices, getServicesById } from '../controllers/servicesController.js'

const router = express.Router()

//no se le pone getServices() por que si se le ponen llama a la funcion y no espera a que ocurran los otros eventos
router.get('/',getServices)
router.post('/',createService)
/* ruta dinamica con id */
router.get('/:id',getServicesById)

export default router