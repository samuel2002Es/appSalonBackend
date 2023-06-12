/* como es un export con const podemos usar las llaves para hacer desestructuracion */
import Services from '../models/Services.js'
import { validateObjectId, handleNotFoundError } from '../utilis/index.js'

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
const getServices =  async(req,res)=>{
    try {
        const services = await Services.find()
        res.json(services)
    } catch (error) {
        console.log(error)
    }
} 
const getServicesById = async (req,res)=>{
    //de la siguiente forma obtenemos el id del usuario
    //console.log(req.params) 
    //utilizamos desestructuracion para obtener solo el valor id
    const {id} = req.params
    //validar un object id, lo ponemos dentro de un if porque en todo caso que retorne un error queremos parar la ejecucion
    if (validateObjectId(id,res)) return
    //validar que exista (no funcionaba porque traia el objeto completo, y solo necesitaba el id)
    const service = await Services.findById(id).exec();
    if (!service) {
        return handleNotFoundError('El servicio no existe',res)
    }

    //mostrar el servicio
    res.json(service)
}
const updateService = async (req,res) => {
    const {id} = req.params
    //validar un object id, lo ponemos dentro de un if porque en todo caso que retorne un error queremos parar la ejecucion
    if (validateObjectId(id,res)) return
    //validar que exista (no funcionaba porque traia el objeto completo, y solo necesitaba el id)
    const service = await Services.findById(id).exec();
    if (!service) {
        return handleNotFoundError('El servicio no existe',res)
    }
    //console.log(service)
    //console.log(id)
    //console.log(req.body)

    //Escribimos en el objeto los valores nuevos
    service.name = req.body.name || service.name
    service.price = req.body.price || service.price

    try {
        await service.save()
        res.json({
            msg: 'El servicio se actualizo correctamente'
        })
    } catch (error) {
        console.log(error)
    }

}
const deleteService = async (req, res) => {
    const {id} = req.params
    //validar un object id
    if (validateObjectId(id,res)) return

    //validar que exista
    const service = await Services.findById(id).exec();
    if (!service) {
        return handleNotFoundError('El servicio no existe',res)
    }

    try {
        await service.deleteOne()
        res.json({
            msg: 'El servicio se elimino correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

export{
    createService,
    getServices,
    getServicesById,
    updateService,
    deleteService
}