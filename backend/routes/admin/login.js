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
    console.log(req.session.id_usuario)
    req.session.destroy();
    console.log(req.session?.id_usuario ?? 'ya no hay usuario')
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

            req.session.id_usuario = dataUsuario.id;
            req.session.id_estado = dataUsuario.id_estado;
            req.session.id_rol = dataUsuario.id_rol;
            req.session.username = dataUsuario.username;

            console.log("prueba " + req.session.id_usuario)

            res.status(201)
            res.json({
                usuario: usuario,
                anio: await helpers.getAnio(),
            });
        } else {
            res.status(422)
            res.json({
                anio: await helpers.getAnio(),
                error: true,
                message: "Usuario o Password Incorrectos"
            });
        }
    } catch (error) {
        console.log(error);

    }
})




module.exports = router;