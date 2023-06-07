import express from 'express'
/* como es un export con const podemos usar las llaves para hacer desestructuracion */
import { services } from '../data/beautyServices.js'

const router = express.Router()

router.get('/', (req,res)=>{
/*     const product = {
        id:1,
        price:30,
        name:'Laptop'
    } */
    res.json(services)
})

export default router