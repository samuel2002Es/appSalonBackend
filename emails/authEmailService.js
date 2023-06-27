import {createTransporter} from '../config/nodemailer.js'

export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransporter(
        "sandbox.smtp.mailtrap.io",
        2525,
        "c30e6357b4c7b3",
        "2f4a26e6644b1f"
    )

    //enviar el email
    const info = await transporter.sendMail({
        from: 'AppSalon',
        to: email,
        subject: "AppSalon - Confirma tu cuenta",
        text: "AppSalon - Confirma tu cuenta",
        html: `<p>Hola: ${name}, confirma tu cuenta en AppSalon</p>
        <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace</p>
        <a href='http://localhost:4000/api/auth/verify/${token}'>Confirmar cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })

    console.log('Mensaje enviado', info.messageId)
}