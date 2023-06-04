let pool = require('../bd');
let md5 = require('md5');

async function getUsuarioByUsenameAndPassword(user, password) {
    try {
        let query = "select * from usuarios where username = ? and password = ? limit 1";
        console.log(user, md5(password), password)
        let rows = await pool.query(query, [user, md5(password)]);
        return rows[0];

    } catch (error) {
        throw error;

    }
}


async function getUsuarioByEmail(email) {
    try {
        let query = "select * from usuarios where email = ? limit 1";
        let rows = await pool.query(query, [email]);
        return rows[0];

    } catch (error) {
        throw error;
    }
}

async function getUsuarioByUsername(username) {
    try {
        let query = "select * from usuarios where username = ? limit 1";
        let rows = await pool.query(query, [username]);
        return rows[0];

    } catch (error) {
        throw error;
    }
}

async function getUsuarioById(id) {
    try {
        let query = "select * from usuarios where id = ? ";
        let rows = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

async function getUsuarios() {
    try {
        let query = "select * from usuarios order by id desc";
        let rows = await pool.query(query);
        return rows;

    } catch (error) {
        throw error;

    }
}

async function insertUsuario(obj) {
    try {

        let query = "insert into usuarios set ? ";
        let rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteUsuarioById(id) {
    try {
        let query = "delete from usuarios where id = ? ";
        let rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function modificarUsuarioById(obj, id) {
    try {
        let query = "update usuarios set ? where id = ? ";
        let rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getUsuarioByUsenameAndPassword, getUsuarios, insertUsuario, deleteUsuarioById, modificarUsuarioById, getUsuarioByEmail, getUsuarioById, getUsuarioByUsername }