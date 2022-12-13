const{Router} = require("express")
const {addLibro, getLibro, getLibroByID, updateLibroByLibro} 
= require("../controllers/Biblioteca")

const router = Router()

///POST///
router.post("/", addLibro)

///GET///
router.get("/", getLibro)
router.get("/id/:id", getLibroByID)

///PATCH///
router.put("/", updateLibroByLibro)


module.exports = router