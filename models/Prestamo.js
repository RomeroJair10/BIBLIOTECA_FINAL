const modelprestamo = {
    queryGetPresta: "SELECT * FROM Prestamo",
    queryGetPrestaByID: `SELECT * FROM Prestamo WHERE ID = ?`,
    queryPrestaExists:`SELECT Nombre_Libro FROM Prestamo WHERE Nombre_Libro = ?`,
    queryAddPresta: `INSERT INTO Prestamo(
        Nombre_Libro,
        Categoria,
        telefono,
        Salida_Libro,
        devolucion_libro,
        Activo) VALUES (?, ?, ?, ?, ?, ?)`,
   queryDeletePrestaByID: `UPDATE Prestamo SET Activo = 'N' WHERE ID = ?`
}
module.exports = modelprestamo