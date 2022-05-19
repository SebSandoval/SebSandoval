import ingresoControllers from "../controllers/ingreso.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helperIngreso from "../helpers/ingresos.js";
import {validarJWT} from "../middlewares/validar-jwt.js"
const router = Router()

router.get('/', validarJWT, ingresoControllers.ingresoGet)


router.get('/query', [validarJWT,
    validarCampos
  ], ingresoControllers.ingresoGetQuery)
  //router.get('/id', IngresoControllers.IngresoGetById)
  router.get('/id/:id', [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
  ], ingresoControllers.ingresoGetById)
  

  

router.post('/', [validarJWT,
  check("usuario", 'El usuario es obligatorio').trim().not().isEmpty(),
  check("proveedor", 'El proveedor es obligatorio').trim().not().isEmpty(),
  check("tipoComprobante", 'El tipoComprobante es obligatorio').trim().not().isEmpty(),
  check("serieComprobante", 'El serieComprobante es obligatorio').trim().not().isEmpty(),
  check("numeroComprobante", 'El numeroComprobante es obligatorio').trim().not().isEmpty(),
  check("impuesto", 'El impuesto es obligatorio').trim().not().isEmpty(),
  check("detalles").custom(helperIngreso.cantidadIngreso),
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