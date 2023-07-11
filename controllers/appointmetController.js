//antes de que cualquier usuario quiera agendar una cita tenemos que verificar que se un usuario valido
//para ello le metimos un middelware y verificamos que su token sea valido

import Appointment from "../models/Appointment.js"
const createAppointment = async (req,res)=>{
    const appointment = req.body
    appointment.user = req.user.id.toString()
    console.log(appointment)
    try {
        const newAppointment = await Appointment(appointment)
        await newAppointment.save()
        //console.log(req.body)
        //console.log(req.user)
    } catch (error) {
        console.log(error)
    }
}
export {
    createAppointment
}