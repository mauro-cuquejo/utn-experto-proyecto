let pool = require('../bd');

async function getRolById(id) {
    let query = "select * from roles where id = ?";
    let rows = await pool.query(query, [id]);
    return rows[0];
}

async function getRolByNombre(nombre) {
    let query = "select * from roles where nombre = ?";
    let rows = await pool.query(query, [nombre]);
    return rows[0];
}

async function getRoles() {
    let query = "select * from roles order by id desc";
    let rows = await pool.query(query);
    return rows;
}

module.exports = { getRolById, getRolByNombre, getRoles }