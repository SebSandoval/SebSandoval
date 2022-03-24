import ingresoControllers from "../controllers/ingreso.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helperIngreso from "../helpers/ingresos.js";
const router = Router()

router.get('/',ingresoControllers.ingresoGet)


router.get('/query', [
    check('query', 'Los campos son obligatorios').not().isEmpty(),
    validarCampos
  ], ingresoControllers.ingresoGetQuery)
  //router.get('/id', IngresoControllers.IngresoGetById)
  router.get('/id/:id', [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
  ], ingresoControllers.ingresoGetById)
  

  

router.post('/', [
    
    validarCampos
  ],ingresoControllers.ingresoPost)


router.put("/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoPut)



  router.put("/activar/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoPutActivar)
  
  router.put("/desactivar/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoPutDesActivar)




router.delete('/:id', [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoDelete)

export default router