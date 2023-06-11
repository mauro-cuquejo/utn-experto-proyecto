let express = require('express');
let router = express.Router();
let helpers = require('../../helpers/helpers');
var nodemailer = require("nodemailer");


router.post('/', async function (req, res, next) {
    try {
        const mail = {
            to: process.env.SMTP_RECIPIENT,
            subject: 'Contacto web',
            html: `${req.body.nombre} se contactó a traves de la web y quiere más información a este correo:
        ${req.body.email} <br> Además, hizo el siguiente comentario: ${req.body.mensaje} <br> Su tel es:
        ${req.body.telefono}`
        }

        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        await transport.sendMail(mail)

        res.status(201);

        res.json({
            anio: await helpers.getAnio(),
            error: false,
            message: 'Mensaje enviado'
        });
    } catch (error) {
        res.status(422)
        res.json({
            anio: await helpers.getAnio(),
            error: true,
            message: error.message
        });
    }

});

module.exports = router;