let pool = require('../bd');

async function getPublicaciones() {
    let query = "select * from publicaciones order by id desc";
    let rows = await pool.query(query);
    return rows;
}

async function insertPublicacion(obj) {
    try {

        let query = "insert into publicaciones set ? ";
        let rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deletePublicacionById(id) {
    try {
        let query = "delete from publicaciones where id = ? ";
        let rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPublicacionById(id) {
    try {
        let query = "select * from publicaciones where id = ? ";
        let rows = await pool.query(query, [id]);

        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function modificarPublicacionById(obj, id) {
    try {
        let query = "update publicaciones set ? where id = ? ";
        let rows = await pool.query(query, [obj, id]);
        console.log(rows)
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getPublicaciones, insertPublicacion, deletePublicacionById, getPublicacionById, modificarPublicacionById }