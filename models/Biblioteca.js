const modelbiblioteca = {
    queryGetLibro: "SELECT * FROM Registro_Libro",
    queryGetLibroByID: `SELECT * FROM Registro_Libro WHERE ID = ?`,
    queryLibroExists:`SELECT Nombre_Libro FROM Registro_Libro WHERE Nombre_Libro = ?`,
    queryAddlibro: `INSERT INTO Registro_Libro(Nombre_Libro,Autor,Numero,Salida,Entrega) VALUES (?, ?, ?, ?, ?)`
}
module.exports = modelbiblioteca