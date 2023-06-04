create table printered_proyecto.roles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(250)
);

create table printered_proyecto.estados (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(250)
);

create table printered_proyecto.usuarios (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(250),
    apellido VARCHAR(250),
    email VARCHAR(250),
    password VARCHAR(250),
    id_rol INT,
    id_estado INT,
    FOREIGN KEY (id_rol) REFERENCES roles(id),
    FOREIGN KEY (id_estado) REFERENCES estados(id)
);

create table printered_proyecto.publicaciones (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(250),
    contenido TEXT,
    imagen VARCHAR(250),
    id_usuario INT,
    id_estado INT,
    fecha_creacion DATE,
    fecha_actualizacion DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_estado) REFERENCES estados(id)
);

create table printered_proyecto.comentarios (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    contenido TEXT,
    id_usuario INT,
    id_publicacion INT,
    fecha_creacion DATE,
    FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

insert into
    printered_proyecto.roles
values
    (1, 'admin'),
    (2, 'final');

insert into
    printered_proyecto.estados
values
    (1, 'activo'),
    (2, 'inactivo');

insert into
    printered_proyecto.usuarios
values
    (
        1,
        'Mauro',
        'Cuquejo',
        'mauro.cuquejo@printered.com',
        md5(1234),
        1,
        1,
        'mauro'
    ),
    (
        2,
        'Flavia',
        'Ursino',
        'flavia.ursino@printered.com',
        md5(1234),
        2,
        1,
        'flavia'
    );

insert into
    printered_proyecto.publicaciones
values
    (
        1,
        'angel exterminador',
        'vendo...',
        null,
        1,
        1,
        SYSDATE(),
        SYSDATE()
    );

insert into
    printered_proyecto.comentarios
values
    (1, 'precio?', 2, 1, SYSDATE());