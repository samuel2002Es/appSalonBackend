import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    services: [
        {   
            //en este caso hacemos funcion de una propiedad de mongose que nos permite mediante un id traer toda la informacion y se hace de la siguiente manera le desimos que el tipo es un schema con un id y referenciamos a el nombre del schema correspondiente de esta forma podemos obtener todos los datos que necesitmeos de ese servicio, es como un join en mysql
            type: mongoose.Schema.Types.ObjectId,
            ref: "Services"
        }
    ],
    date: {
        type: Date
    },
    time: {
        type: String
    },
    totalAmount: {
        type: Number
    },
    user: {
        //necesitamos ademas saber que usuario hizo la reservacion por ello hacemos lo mismo, le decimos que se traiga la informacion de otro schema dada por su id
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;