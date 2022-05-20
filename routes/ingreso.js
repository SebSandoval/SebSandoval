import ingresoControllers from "../controllers/ingreso.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helperIngreso from "../helpers/ingresos.js";
import {validarJWT} from "../middlewares/validar-jwt.js"
import checkRol from "../middlewares/rol.js";
const router = Router()

router.get('/', validarJWT, checkRol(["ADMINISTRADOR", "ALMACENISTA"]), ingresoControllers.ingresoGet)


router.get('/query', [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
    validarCampos
  ], ingresoControllers.ingresoGetQuery)
  //router.get('/id', IngresoControllers.IngresoGetById)
  router.get('/id/:id', [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
  ], ingresoControllers.ingresoGetById)
  

  

router.post('/', [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check("usuario", 'El usuario es obligatorio').trim().not().isEmpty(),
  check('usuario', 'No es un mongoID ').isMongoId(),
  check("proveedor", 'El proveedor es obligatorio').trim().not().isEmpty(),
  check('proveedor', 'No es un mongoID ').isMongoId(),
  check("tipoComprobante", 'El tipoComprobante es obligatorio').trim().not().isEmpty(),
  check("serieComprobante", 'El serieComprobante es obligatorio').trim().not().isEmpty(),
  check("numeroComprobante", 'El numeroComprobante es obligatorio').trim().not().isEmpty(),
  check("impuesto", 'El impuesto es obligatorio').trim().not().isEmpty(),
  check("detalles").custom(helperIngreso.cantidadIngreso),
  validarCampos
 
    
  ],ingresoControllers.ingresoPost)


router.put("/:id", [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoPut)



  router.put("/activar/:id", [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoPutActivar)
  
  router.put("/desactivar/:id", [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoPutDesActivar)




router.delete('/:id', [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoControllers.ingresoDelete)

export default router