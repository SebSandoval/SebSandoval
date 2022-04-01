import ingresoControllers from "../controllers/ingreso.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helperIngreso from "../helpers/ingresos.js";
import {validarJWT} from "../middlewares/validar-jwt.js"
const router = Router()

router.get('/', validarJWT, ingresoControllers.ingresoGet)


router.get('/query', [validarJWT,
    check('query', 'Los campos son obligatorios').not().isEmpty(),
    validarCampos
  ], ingresoControllers.ingresoGetQuery)
  //router.get('/id', IngresoControllers.IngresoGetById)
  router.get('/id/:id', [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
  ], ingresoControllers.ingresoGetById)
  

  

router.post('/', [validarJWT,
    
    validarCampos
  ],ingresoControllers.ingresoPost)


router.put("/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoPut)



  router.put("/activar/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoPutActivar)
  
  router.put("/desactivar/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoPutDesActivar)




router.delete('/:id', [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoDelete)

export default router