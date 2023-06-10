let express = require('express');
let router = express.Router();
let usuariosModel = require('../../models/usuariosModel')
let rolesModel = require('../../models/rolesModel')
let estadosModel = require('../../models/estadosModel')
let helpers = require('../../helpers/helpers');

//esta deberia ser parte del frontend.
router.get('/', async function (req, res, next) {
    res.status(200);
    res.json({ anio: await helpers.getAnio() })
});

router.get('/logout', async function (req, res, next) {
    req.session.destroy();
    res.json({ anio: await helpers.getAnio() });
});

router.post('/', async (req, res, next) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        let dataUsuario = await usuariosModel.getUsuarioByUsenameAndPassword(username, password);

        if (dataUsuario != undefined) {

            let dataRol = await rolesModel.getRolById(dataUsuario.id_rol);
            let dataEstado = await estadosModel.getEstadoById(dataUsuario.id_estado);

            let usuario = {
                nombre: dataUsuario.nombre,
                apellido: dataUsuario.apellido,
                email: dataUsuario.email,
                rol: dataRol?.nombre ?? '',
                estado: dataEstado?.nombre ?? '',
                username: dataUsuario.username
            }

            res.status(201)
            res.json({
                usuario: usuario,
                anio: await helpers.getAnio(),
            });
        } else {
            throw new Error("Usuario y/o Password Incorrectos")
        }
    } catch (error) {
        res.status(422)
        res.json({
            anio: await helpers.getAnio(),
            error: true,
            message: error.message
        });

    }
})




module.exports = router;