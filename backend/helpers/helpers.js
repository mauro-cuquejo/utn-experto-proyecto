async function getAnio() {
    try {
        let fecha = await new Date();
        return await fecha.getFullYear();

    } catch (error) {
        throw error;
    }
}

module.exports = { getAnio }