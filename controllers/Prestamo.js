const{reques, response, request} = require("express")
const {query} = require("../db/connection")
//const bcryptjs = require("bcryptjs")
const pool = require("../db/connection")
const modelprestamo = require("../models/Prestamo")

const addpresta = async (req = request, res = response) => {
    const {
        Nombre_Libro,
        Categoria,
        telefono,
        Salida_Libro,
        devolucion_libro,
        Activo} = req.body//URI params

    if (!Nombre_Libro||
        !Categoria||
        !telefono||
        !Salida_Libro||
        !devolucion_libro||
        !Activo)
       
        {res.status(400).json({msg: "Hacen faltan datos"})
        return}

    //const salt = bcryptjs.genSaltSync()
    //const contrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)
    
    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        
         //generamos la consulta
         const [prestaExist] = await conn.query(modelprestamo.queryPrestaExists, [Nombre_Libro], (error) =>{if(error) throw error})
        
        if(prestaExist){
            res.json({msg:`El libro llamado '${Nombre_Libro}' a sido prestado.`})
            return
        }

                    //generamos la consulta
                    const result = await conn.query(modelprestamo.queryAddPresta, 
                        [Nombre_Libro, Categoria, telefono,
                         Salida_Libro, devolucion_libro, Activo], (error) => {if(error) throw error})

        if (result.affectedRows === 0) {   //En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `El libro llamdo '${Nombre_Libro}' no esta registrado`})
            return
        }
                    
            res.json({msg:`El libro llamdo'${Nombre_Libro}' se acaba de prestar`}) //Se manda la lista de usuarios
        }
   
        catch (error) {
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
       }
    
    finally{
        if (conn) conn.end()//Termina la conexión
        }

}

const getpresta = async (req = reques, res = response) => {
    let conn
    
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const presta = await conn.query(modelprestamo.queryGetPresta, (error) => {if(error) throw error})

        if(presta.length === 0) { // En caso de no haber registros lo informamos
            res.status(404).json({msg: "El libro a sido prestado"})
            return
        }
        res.json({presta})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const getprestaByID = async (req = request, res = response) =>{
    const {id} = req.params//URI params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [presta] = await conn.query(modelprestamo.queryGetPrestaByID,[id], (error) => {if (error) throw error})
        console.log(presta)

        if(!presta){ // En caso de no haber registros lo informamos
            res.status(404).json
            ({msg: `El libro no se encuentra en el sistema o se acama de prestar ${id}`})
            return
        }
        res.json({presta})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const updateprestaBypresta = async (req = request, res = response) => { 
    const {Nombre_Libro, Salida_Libro, devolucion_libro} = req.body//URI params

    if(!Nombre_Libro || !Salida_Libro || !devolucion_libro) 
    { res.status(400).json({msg: "Hacen faltan datos"})
    return }

    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        const [prestaExist] = await conn.query(modelprestamo.queryPrestaExists, [Nombre_Libro])
        
        if (!prestaExist) {
            res.json({msg: `El libro llamado '${Nombre_Libro} no se encuentra en el sistema`})
            return
        }

                    //generamos la consulta
                    const result = await conn.query(`UPDATE Prestamo SET  
                    Salida_Libro = '${Salida_Libro}', devolucion_libro = '${devolucion_libro}'`, 
                    (error) => {if (error) throw error})

                    if (result.affectedRows === 0) {//En caso de no haber registrado la informacion
                    res.status(404).json({msg: `No se puede agregar el libro llamado ${Nombre_Libro}`})
                    return
                    }
                    
                    res.json({msg:`Se a actualizado el libro ${Nombre_Libro}`})
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

const deletepretaByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelprestamo.queryDeletePrestaByID, [id], (error) => {if (error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `El libro no existe con la ID ${id}`})
            return
        }

        res.json({msg:`Se elinino el libro por la ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}

module.exports = {addpresta, getpresta, getprestaByID, updateprestaBypresta, deletepretaByID}