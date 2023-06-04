let pool = require('../bd');

async function getEstadoById(id) {
    let query = "select * from estados where id = ?";
    let rows = await pool.query(query, [id]);
    return rows[0];
}

async function getEstadoByNombre(nombre) {
    let query = "select * from estados where nombre = ?";
    let rows = await pool.query(query, [nombre]);
    return rows[0];
}

async function getEstados() {
    let query = "select * from estados order by id desc";
    let rows = await pool.query(query);
    return rows;
}

module.exports = { getEstadoById, getEstadoByNombre, getEstados }