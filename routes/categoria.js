import { query, Router } from "express";
import { check } from "express-validator"; //npm i express-validator  para validar mongoid
import categoriaControllers from '../controllers/categoria.js'
import helperCategoria from "../helpers/categorias.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router()

router.get('/', categoriaControllers.categoriaGet)

router.get('/query', [
  check('query', 'Los campos son obligatorios').not().isEmpty(),
  validarCampos
], categoriaControllers.categoriaGetQuery)
//router.get('/id', categoriaControllers.categoriaGetById)
router.get('/id/:id', [
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
], categoriaControllers.categoriaGetById)



router.post('/', [
  check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
  check("descripcion", 'La descripcion es obligatoria').trim().not().isEmpty(),
  check('nombre',).custom(helperCategoria.existeCategoriaByNombre),
  validarCampos
], categoriaControllers.categoriaPost)



router.put("/:id", [
  check('id', 'No es un mongoID ').isMongoId(),
  check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
  check("descripcion", 'La descripcion es obligatoria').trim().not().isEmpty(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos
], categoriaControllers.categoriaPut)

router.put("/activar/:id", [
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos
], categoriaControllers.categoriaPutActivar)

router.put("/desactivar/:id", [
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos                             //validar que sea un mongoId 
], categoriaControllers.categoriaPutDesActivar)



router.delete("/:id", [
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos
], categoriaControllers.categoriaDelete)

export default router