const{Router} = require("express")
const {addpresta, getpresta, getprestaByID, updateprestaBypresta, deletepretaByID} 
= require("../controllers/Prestamo")

const router = Router()

///POST///
router.post("/", addpresta)

///GET///
router.get("/", getpresta)
router.get("/id/:id", getprestaByID)

///PATCH///
router.put("/", updateprestaBypresta)

///DELETE///
router.delete("/id/:id", deletepretaByID)

module.exports = router