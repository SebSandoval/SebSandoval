import articuloControllers from "../controllers/articulo.js";
import helperArticulo from "../helpers/articulos.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router()
router.get('/', articuloControllers.articuloGet)


router.get('/query', [
  check('query', 'Los campos son obligatorios').not().isEmpty(),
  validarCampos
], articuloControllers.articuloGetQuery)


router.get('/id/:id', [
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperArticulo.existeArticuloById),
  validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
], articuloControllers.articuloGetById)

router.post('/', [
  check("codigo", 'El codigo es obligatorio').not().isEmpty(),
  check("nombre", 'El nombre es obligatorio').not().isEmpty(),
  check("categoria", 'La categoria es obligatoria').not().isEmpty(),
  check("stock", 'El stock es obligatorio').not().isEmpty(),
  check("impuesto", 'El impuesto es obligatorio').not().isEmpty(),
  check("precioVenta", 'El precio es obligatorio').not().isEmpty(),
  check("descripcion", 'La descripcion es obligatoria').not().isEmpty(),

  check('nombre').custom(helperArticulo.existeArticuloByNombre),
  validarCampos
], articuloControllers.articuloPost)

router.put("/:id", [
  check('id', 'No es un mongoID ').isMongoId(),
  
  check("nombre", 'El nombre es obligatorio').not().isEmpty(),
  check("categoria", 'La categoria es obligatoria').not().isEmpty(),
  check("stock", 'El stock es obligatorio').not().isEmpty(),
  check("impuesto", 'El impuesto es obligatorio').not().isEmpty(),
  check("precioVenta", 'El precio es obligatorio').not().isEmpty(),
  check("descripcion", 'La descripcion es obligatoria').not().isEmpty(),
  check('id',).custom(helperArticulo.existeArticuloById),
  validarCampos
], articuloControllers.articuloPut)

router.put("/activar/:id", [
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperArticulo.existeArticuloById),
  validarCampos
], articuloControllers.articuloPutActivar)

router.put("/desactivar/:id", [
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperArticulo.existeArticuloById),
  validarCampos
], articuloControllers.articuloPutDesActivar)

router.delete('/:id', [
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperArticulo.existeArticuloById),
  validarCampos
], articuloControllers.articuloDelete)

export default router