import ventaControllers from "../controllers/venta.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helperVenta from "../helpers/ventas.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
const router = Router()

router.get('/', validarJWT, ventaControllers.ventaGet)

router.get('/query', [validarJWT,
    check('query', 'Los campos son obligatorios').not().isEmpty(),
    validarCampos
  ], ventaControllers.ventaGetQuery)
  //router.get('/id', ventaControllers.ventaGetById)
  router.get('/id/:id', [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperVenta.existeVentaById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
  ], ventaControllers.ventaGetById)

  

router.post('/',[validarJWT,
    check("usuario", 'El usuario es obligatorio').trim().not().isEmpty(),
    check("cliente", 'El cliente es obligatorio').trim().not().isEmpty(),
    check("tipoComprobante", 'El tipoComprobante es obligatorio').trim().not().isEmpty(),
    check("serieComprobante", 'El serieComprobante es obligatorio').trim().not().isEmpty(),
    check("numeroComprobante", 'El numeroComprobante es obligatorio').trim().not().isEmpty(),
    check("impuesto", 'El impuesto es obligatorio').trim().not().isEmpty(),
    check("total", 'El total es obligatorio').trim().not().isEmpty(),
    validarCampos
  ], ventaControllers.ventaPost)


router.put("/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperVenta.existeVentaById),
    validarCampos
  ], ventaControllers.ventaPut)

router.put("/activar/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperVenta.existeVentaById),
    validarCampos
  ], ventaControllers.ventaPutActivar)
  
  router.put("/desactivar/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperVenta.existeVentaById),
    validarCampos                             //validar que sea un mongoId 
  ], ventaControllers.ventaPutDesActivar)

router.delete('/:id', [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperVenta.existeVentaById),
    validarCampos
  ], ventaControllers.ventaDelete)

export default router