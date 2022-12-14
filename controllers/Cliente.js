const{reques, response, request} = require("express")
const {query} = require("../db/connection")
//const bcryptjs = require("bcryptjs")
const pool = require("../db/connection")
const modelpersona = require("../models/Cliente")

const addCliente = async (req = request, res = response) => {
    const {
        Nombre,
        Apellido,
        Telefono,
        Nombre_Libro,
        Activo
         } = req.body//URI params

    if (!Nombre ||
        !Apellido ||
        !Telefono || 
        !Nombre_Libro ||
        !Activo)
       
        {res.status(400).json({msg: "Hacen faltan datos"})
        return}

    //const salt = bcryptjs.genSaltSync()
    //const contrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)
    
    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        
         //generamos la consulta
         const [clienExist] = await conn.query(modelpersona.queryClienteExists, [Nombre], (error) =>{if(error) throw error})
        
        if(clienExist){
            res.json({msg:`El cliente llamdo '${Nombre}' esta registrado.`})
            return
        }

                    //generamos la consulta
                    const result = await conn.query(modelpersona.queryAddCliente, 
                        [Nombre, Apellido, Telefono, Nombre_Libro,
                        Activo], (error) => {if(error) throw error})

        if (result.affectedRows === 0) {   //En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `El cliente llamdo '${Nombre}' no se puede agregar al sistema`})
            return
        }
                    
            res.json({msg:`El cliente llamdo '${Nombre}' se agrego exitosamente al sistema`}) //Se manda la lista de usuarios
        }
   
        catch (error) {
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
       }
    
    finally{
        if (conn) conn.end()//Termina la conexión
        }

}

const getCliente= async (req = reques, res = response) => {
    let conn
    
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const clien = await conn.query(modelpersona.queryGetCliente, (error) => {if(error) throw error})

        if(clien.length === 0) { // En caso de no haber registros lo informamos
            res.status(404).json({msg: "El cliente no se encuentra registrado en el sistema"})
            return
        }
        res.json({clien})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const getClienteByID = async (req = request, res = response) =>{
    const {id} = req.params//URI params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [clien] = await conn.query(modelpersona.queryGetClienteByID,[id], (error) => {if (error) throw error})
        console.log(clien)

        if(!clien){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `El cliente no esta registrado con la ID ${id}`})
            return
        }
        res.json({clien})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const updateClienteByCliente = async (req = request, res = response) => {
    const {Nombre, Telefono, Nombre_Libro} = req.body//URI params

    if(!Nombre || !Telefono || !Nombre_Libro) 
    { res.status(400).json({msg: "Hacen faltan datos"})
    return }

    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        const [clienExist] = await conn.query(modelpersona.queryClienteExists, [Nombre])
        
        if (!clienExist) {
            res.json({msg: `El cliente '${Nombre} no se encuentra en el sistema`})
            return
        }

                    //generamos la consulta
                    const result = await conn.query(`UPDATE Cliente SET  
                    Telefono = '${Telefono}', Nombre_Libro = '${Nombre_Libro}'`, 
                    (error) => {if (error) throw error})

                    if (result.affectedRows === 0) {//En caso de no haber registrado la informacion
                    res.status(404).json({msg: `No se puede agregar el cliente con el nombre ${Nombre}`})
                    return
                    }
                    
                    res.json({msg:`Se agrego sactifactoriamente el cliente con el nombre ${Nombre}`})
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


module.exports = {addCliente, getCliente, getClienteByID, updateClienteByCliente}