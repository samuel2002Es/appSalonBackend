/* como es un export con const podemos usar las llaves para hacer desestructuracion */
import { services } from '../data/beautyServices.js'
import Services from '../models/Services.js'
//req es lo que envias res es la repuesta que recibes
const createService = async (req,res)=>{
    //object.values convierte el {} a un arreglo y verificamos que no este vacio con includes
    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios')
        //cambiamos el estatus para que muestre un error y no un estatus 200 y un error 404 cuando no se encontro 403 no hay permiso adecuado y agregamos return para cortar la ejecucion del codigo en caso de error
        return res.status(400).json({
            msg: error.message
        })
    }
    console.log('Desde createServico todo esta correcto')
    try {
        //registrando servicios de esta forma se guarda en la base de datos
        const services = new Services(req.body)
        await services.save()
        res.json({
            msg: "El servicio se registro correctamente"
        })
    } catch (error) {
        console.log(error)
    }
}
const getServices =  (req,res)=>{
    res.json(services)
}
const getServicesById = (req,res)=>{
    console.log("Desde getServiceById")
}

export{
    createService,
    getServices,
    getServicesById
}