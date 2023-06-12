import express from 'express'
import { createService, deleteService, getServices, getServicesById, updateService } from '../controllers/servicesController.js'

const router = express.Router()

//no se le pone getServices() por que si se le ponen llama a la funcion y no espera a que ocurran los otros eventos
router.get('/',getServices)
router.post('/',createService)
/* ruta dinamica con id */
router.get('/:id',getServicesById)
router.put('/:id',updateService)
router.delete('/:id',deleteService)
export default router