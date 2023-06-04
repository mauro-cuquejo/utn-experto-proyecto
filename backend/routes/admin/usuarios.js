let express = require('express');
let router = express.Router();
let usuariosModel = require('../../models/usuariosModel');
let rolesModel = require('../../models/rolesModel')
let estadosModel = require('../../models/estadosModel')
let helpers = require('../../helpers/helpers');
const md5 = require('md5');


router.get('/', async function (req, res, next) {
    let username = req.session?.username ?? "";

    let usuarios = await usuariosModel.getUsuarios();

    usuarios = await usuarios.map(async usuario => {
        let dataRol = await rolesModel.getRolById(usuario.id_rol);
        let dataEstado = await estadosModel.getEstadoById(usuario.id_estado);

        return {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            rol: dataRol?.nombre ?? '',
            estado: dataEstado?.nombre ?? '',
            username: usuario.username
        }

    });

    res.status(200);
    res.json({
        usuarios: await Promise.all(usuarios),
        anio: await helpers.getAnio(),
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            throw new Error("Body vacío");
        }

        if (req.body.nombre != "" && req.body.apellido != "" && req.body.email != "" && req.body.password != "" && req.body.rol != "" && req.body.username != "") {
            if (await usuariosModel.getUsuarioByEmail(req.body.email)) {
                throw new Error("email ya registrado, ¿desea loguearse?");
            }

            if (await usuariosModel.getUsuarioByUsername(req.body.username)) {
                throw new Error("nombre de usuario ya registrado. Elija otro.");
            }
            let rol = await rolesModel.getRolByNombre(req.body.rol);
            let usuario = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: md5(req.body.password),
                id_rol: rol.id,
                id_estado: 1,
                username: req.body.username
            }
            await usuariosModel.insertUsuario({ ...usuario });
            res.status(201);
            res.json({ anio: await helpers.getAnio() });
        } else {
            throw new Error("Todos los campos son requeridos");
        }
    } catch (error) {
        res.status(422);
        res.json({
            anio: await helpers.getAnio(),
            error: true,
            message: error.message
        })

    }
})

router.delete('/eliminar', async (req, res, next) => {
    try {
        let usuario = await usuariosModel.getUsuarioById(req.body.id);
        if (!usuario) {
            throw new Error("no se encontró usuario solicitado");
        }

        try {
            await usuariosModel.deleteUsuarioById(req.body.id);
            res.status(201);
            res.json({ anio: await helpers.getAnio() });
        } catch (error) {
            throw new Error("Error al eliminar usuario");
        }

    } catch (error) {
        res.status(422);
        res.json({
            anio: await helpers.getAnio(),
            error: true,
            message: error.message
        });
    }
})

module.exports = router;
