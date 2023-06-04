let express = require('express');
let router = express.Router();
let publicacionesModel = require('../models/publicacionesModel');
let cloudinary = require('cloudinary').v2;

router.get('/', async function (req, res, next) {
    res.status(200).json({ status: 'ok api' })
});

router.get('/publicaciones', async function (req, res, next) {
    let publicaciones = await publicacionesModel.getPublicaciones();

    publicaciones = publicaciones.map(publicacion => {
        if (publicacion.imagen) {
            const imagen = cloudinary.url(publicacion.imagen, {
                width: 512,
                height: 425,
                crop: 'scale'
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

    res.status(200);
    res.json(publicaciones);
});



module.exports = router;