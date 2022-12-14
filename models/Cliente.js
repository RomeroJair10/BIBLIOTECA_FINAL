const modelpersona = {
    queryGetCliente: "SELECT * FROM Cliente",
    queryGetClienteByID: `SELECT * FROM Cliente WHERE ID = ?`,
    queryClienteExists:`SELECT Nombre FROM Cliente WHERE Nombre = ?`,
    queryAddCliente: `INSERT INTO Cliente(
        Nombre,
        Apellido,
        Telefono,
        Nombre_Libro,
        Activo) VALUES (?, ?, ?, ?, ?)`
}
module.exports = modelpersona