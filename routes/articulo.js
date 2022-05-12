import articuloControllers from "../controllers/articulo.js";
import helperArticulo from "../helpers/articulos.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import checkRol from "../middlewares/rol.js";

const router = Router()
router.get('/', validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]), articuloControllers.articuloGet)

router.get('/act', validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]), articuloControllers.articuloGetAct)

router.get('/query', [validarJWT,checkRol(["ADMINISTRADOR"]),
  check('query', 'Los campos son obligatorios').not().isEmpty(),
  validarCampos
], articuloControllers.articuloGetQuery)


router.get('/id/:id', [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperArticulo.existeArticuloById),
  validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
], articuloControllers.articuloGetById)

router.post('/', [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check("codigo", 'El codigo es obligatorio').trim().not().isEmpty(),
  check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
  check("nombre", 'El nombre no debe ser mayor a 20 caracteres').isLength({ max: 20 }),
  check("categoria", 'La categoria es obligatoria').trim().not().isEmpty(),
  check("stock", 'El stock es obligatorio').trim().not().isEmpty(),
  check("impuesto", 'El impuesto es obligatorio').trim().not().isEmpty(),
  check("precioVenta", 'El precio es obligatorio').trim().not().isEmpty(),
  check("descripcion", 'La descripcion es obligatoria').trim().not().isEmpty(),
  check("descripcion", 'La descripcion no debe ser mayor a 100 caracteres').isLength({ max: 100 }),
  check('stock').custom(helperArticulo.articuloStock),
  check('precioVenta').custom(helperArticulo.articuloprecioVenta),
  check('nombre').custom(helperArticulo.existeArticuloByNombre),
  check('codigo').custom(helperArticulo.existeArticuloByCodigo),
  validarCampos
], articuloControllers.articuloPost)

router.put("/:id", [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
  check("nombre", 'El nombre no debe ser mayor a 20 caracteres').isLength({ max: 20 }),
  check("categoria", 'La categoria es obligatoria').trim().not().isEmpty(),
  check("stock", 'El stock es obligatorio').trim().not().isEmpty(),
  check("impuesto", 'El impuesto es obligatorio').trim().not().isEmpty(),
  check("precioVenta", 'El precio es obligatorio').trim().not().isEmpty(),
  check("descripcion", 'La descripcion es obligatoria').trim().not().isEmpty(),
  check("descripcion", 'La descripcion no debe ser mayor a 100 caracteres').isLength({ max: 100 }),
  check('id',).custom(helperArticulo.existeArticuloById),
  check('stock').custom(helperArticulo.articuloStock),
  check('precioVenta').custom(helperArticulo.articuloprecioVenta),
  validarCampos
], articuloControllers.articuloPut)

router.put("/activar/:id", [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperArticulo.existeArticuloById),
  validarCampos
], articuloControllers.articuloPutActivar)

router.put("/desactivar/:id", [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperArticulo.existeArticuloById),
  validarCampos
], articuloControllers.articuloPutDesActivar)

router.delete('/:id', [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperArticulo.existeArticuloById),
  validarCampos
], articuloControllers.articuloDelete)

export default router