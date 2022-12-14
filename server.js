const express = require('express')
const librosRouter = require('./routes/Biblioteca')
const clienteRouter = require('./routes/Clientes')
const prestamoRouter = require('./routes/Prestamo')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            libros: "/api/v1/libros",
            cliente: "/api/v1/cliente",
            prestamo: "/api/v1/prestamo"

        }
        this.middlewares()
        this.routes()
    }
    routes(){ ','
        //this.app.get('/', (req, res) => {
        //res.send('Mensaje recibido')
       // }) //End point

       this.app.use(this.paths.libros, librosRouter)
       this.app.use(this.paths.cliente, clienteRouter)
       this.app.use(this.paths.prestamo, prestamoRouter)
 }
    middlewares(){
        this.app.use(cors())// habilita origen curzado
        this.app.use(express.json())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}
module.exports = Server



