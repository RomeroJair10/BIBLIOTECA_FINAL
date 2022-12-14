const{Router} = require("express")
const {addCliente, getCliente, getClienteByID, updateClienteByCliente} 
= require("../controllers/Cliente")

const router = Router()

///POST///
router.post("/", addCliente)

///GET///
router.get("/", getCliente)
router.get("/id/:id", getClienteByID)

///PATCH///
router.put("/", updateClienteByCliente)


module.exports = router