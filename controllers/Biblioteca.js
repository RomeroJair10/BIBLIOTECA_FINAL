const{reques, response, request} = require("express")
const {query} = require("../db/connection")
//const bcryptjs = require("bcryptjs")
const pool = require("../db/connection")
const modelbiblioteca = require("../models/Biblioteca")

const addLibro = async (req = request, res = response) => {
    const {
        Nombre_Libro,
        Autor,
        Numero,
        Salida,
        Entrega
         } = req.body//URI params

    if (!Nombre_Libro ||
        !Autor ||
        !Numero ||
        !Salida ||
        !Entrega)
       
        {res.status(400).json({msg: "Hacen faltan datos"})
        return}

    //const salt = bcryptjs.genSaltSync()
    //const contrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)
    
    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        
         //generamos la consulta
         const [libroExist] = await conn.query(modelbiblioteca.queryLibroExists, [Nombre_Libro], (error) =>{if(error) throw error})
        
        if(libroExist){
            res.json({msg:`El Libro llamado: '${Nombre_Libro}' esta registrado.`})
            return
        }

                    //generamos la consulta
                    const result = await conn.query(modelbiblioteca.queryAddlibro, 
                        [Nombre_Libro,
                         Autor,
                         Numero,
                         Salida,
                         Entrega], 
                         (error) => {if(error) throw error})

        if (result.affectedRows === 0) {   //En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `No se puede agregar el libro llamado ${Nombre_Libro}`})
            return
        }
                    
            res.json({msg:`Se agrego exitosamente el libro llamado ${Nombre_Libro}`}) //Se manda la lista de usuarios
        }
   
        catch (error) {
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
       }
    
    finally{
        if (conn) conn.end()//Termina la conexión
        }

}

const getLibro= async (req = reques, res = response) => {
    let conn
    
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const Libro = await conn.query(modelbiblioteca.queryGetLibro, (error) => {if(error) throw error})

        if(Libro.length === 0) { // En caso de no haber registros lo informamos
            res.status(404).json({msg: "El libro no esta registrado"})
            return
        }
        res.json({Libro})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const getLibroByID = async (req = request, res = response) =>{
    const {id} = req.params//URI params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [Libro] = await conn.query(modelbiblioteca.queryGetLibroByID,[id], (error) => {if (error) throw error})
        console.log(Libro)

        if(!Libro){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `El libro no esta registrado con la ID ${id}`})
            return
        }
        res.json({Libro})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const updateLibroByLibro = async (req = request, res = response) => {
    const {Nombre_Libro, Autor, Numero} = req.body//URI params

    if(!Nombre_Libro || !Autor || !Numero) 
    { res.status(400).json({msg: "Hacen faltan datos"})
    return }

    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        const [libroExist] = await conn.query(modelbiblioteca.queryLibroExists, [Nombre_Libro])
        
        if (!libroExist) {
            res.json({msg: `El libro '${Nombre_Libro} no se encuentra registrado`})
            return
        }

                    //generamos la consulta
                    const result = await conn.query(`UPDATE Registro_Libro SET 
                    Nombre_Libro = '${Nombre_Libro}', Autor = '${Autor}',Numero = '${Numero}'`, 
                    (error) => {if (error) throw error})

                    if (result.affectedRows === 0) {//En caso de no haber registrado la informacion
                    res.status(404).json({msg: `No se puede agregar el libro con el nombre ${Nombre_Libro}`})
                    return
                    }
                    
                    res.json({msg:`Se actualizo sactifactoriamente el libro ${Nombre_Libro}`})
                    //Se manda la lista de usuarios
        }

    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
                 }
    
    finally{
        if (conn) conn.end()//Termina la conexión
           }

}

module.exports = {addLibro, getLibro, getLibroByID, updateLibroByLibro}