let express = require('express');
let router = express.Router();
let publicacionesModel = require('../../models/publicacionesModel')
let usuariosModel = require('../../models/usuariosModel')
let rolesModel = require('../../models/rolesModel')
let estadosModel = require('../../models/estadosModel')
let helpers = require('../../helpers/helpers')
let util = require('util');
let cloudinary = require('cloudinary').v2;

const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);


router.get('/', async (req, res, next) => {
    try {
        let username = req.query?.user;
        let usuario;
        if (username != "") {
            usuario = await usuariosModel.getUsuarioByUsername(username);
        }

        let publicaciones;
        if (usuario) {
            publicaciones = await publicacionesModel.getPublicacionesByIdUsuario(usuario?.id);
        } else {
            publicaciones = await publicacionesModel.getPublicaciones();
        }

        publicaciones = await publicaciones.map(publicacion => {
            if (publicacion.imagen_id) {
                const imagen = cloudinary.image(publicacion.imagen_id, {
                    width: 540,
                    height: 540,
                    crop: 'fill'
                });
                return {
                    ...publicacion,
                    imagen
                }
            } else {
                return {
                    ...publicacion,
                    imagen: ''
                }
            }
        });


        res.status(publicaciones.length > 0 ? 200 : 204);
        res.json({
            anio: await helpers.getAnio(),
            username,
            publicaciones
        })
    } catch (error) {
        res.status(422);
        res.json({
            anio: await helpers.getAnio(),
            error: true,
            message: "Error en consulta"
        })
    }
});


router.post('/agregar', async (req, res, next) => {
    try {
        let imagen_id = "";

        if (req.files && Object.keys(req.files).length > 0) {
            let archivo_imagen = req.files.imagen;
            imagen_id = (await uploader(archivo_imagen.tempFilePath)).public_id;
        }

        let usuario = await usuariosModel.getUsuarioByUsername(req.body.username);
        let id_usuario = usuario.id;
        let estado = await estadosModel.getEstadoById(id_usuario);
        let id_estado = estado.id;

        let rol = rolesModel.getRolById(id_usuario);
        let id_rol = rol.id;

        let fecha = new Date();

        if (Object.keys(req.body).length == 0) {
            throw new Error("Body vacío");
        }

        if (req.body.titulo != "" && req.body.contenido != "" && req.body.precio != "") {
            await publicacionesModel.insertPublicacion({ titulo: req.body.titulo, contenido: req.body.contenido, precio: req.body.precio, imagen_id, id_usuario, id_estado, fecha_creacion: fecha, fecha_actualizacion: fecha });
            res.status(201);
            res.json({ anio: await helpers.getAnio() });
        } else {
            throw new Error("Todos los campos son requeridos (excepto la imagen)");
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


router.get('/modificar', async (req, res, next) => {
    try {
        const id = req.query.id;
        let publicacion = await publicacionesModel.getPublicacionById(id);
        if (!publicacion) {
            throw new Error("no se encontró la publicación solicitada");
        }

        let imagen_actual = (publicacion.imagen_id != null) ? cloudinary.image(publicacion.imagen_id, {
            width: 200,
            height: 200,
            crop: 'fill'
        }) : '';

        publicacion = { ...publicacion, imagen_actual };

        res.status(200);
        res.json({ anio: await helpers.getAnio(), publicacion });
    } catch (error) {
        res.status(422);
        res.json({
            anio: await helpers.getAnio(),
            error: true,
            message: error.message
        })
    }

});


router.patch('/modificar', async (req, res, next) => {
    try {
        let imagen_id = req.body.imagen_id_original;

        let borrar_imagen_anterior = false;
        if (req.body.imagen_delete === 'true') {
            imagen_id = null;
            borrar_imagen_anterior = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                let imagen_archivo = req.files.imagen;
                imagen_id = (await uploader(imagen_archivo.tempFilePath)).public_id;
                borrar_imagen_anterior = true;
            }
        }
        if (borrar_imagen_anterior && req.body.imagen_id_original) {
            await (destroy(req.body.imagen_id_original));
        }

        let fecha = new Date();

        let obj = {
            titulo: req.body.titulo,
            contenido: req.body.contenido,
            precio: req.body.precio,
            imagen_id,
            fecha_actualizacion: fecha
        }
        if (req.body.titulo != "" && req.body.contenido != "" && req.body.precio != "") {
            await publicacionesModel.modificarPublicacionById(obj, req.body.id);
            res.status(201);
            res.json({ anio: await helpers.getAnio() });

        } else {
            throw new Error("Error al modificar novedad");
        }
    } catch (error) {
        let imagen_actual = (publicacion.imagen_id != null) ? cloudinary.image(publicacion.imagen_id, {
            width: 200,
            height: 200,
            crop: 'fill'
        }) : '';

        let publicacion = { ...obj, imagen_actual };
        res.status(422);
        res.json({
            anio: await helpers.getAnio(),
            novedad: publicacion,
            error: true,
            message: error
        });
    }
})


router.get('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;
    let publicacion = await publicacionesModel.getPublicacionById(id);

    let imagen_actual = (publicacion.imagen != null) ? cloudinary.image(publicacion.imagen, {
        width: 100,
        height: 100,
        crop: 'fill'
    }) : '';

    publicacion = { ...publicacion, imagen_actual };

    res.status(200);
    res.json({ anio: await helpers.getAnio(), publicacion });
});


router.delete('/eliminar', async (req, res, next) => {
    try {
        const id = req.query.id;

        let publicacion = await publicacionesModel.getPublicacionById(id);
        if (!publicacion) {
            throw new Error("no se encontró la publicación solicitada");
        }
        if (publicacion.imagen) {
            await (destroy(publicacion.imagen));
        }
        try {
            await publicacionesModel.deletePublicacionById(id);
            res.status(201);
            res.json({ anio: await helpers.getAnio() });
        } catch (error) {
            throw new Error("Error al eliminar la publicación");
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