import { query, Router } from "express";
import { check } from "express-validator"; //npm i express-validator  para validar mongoid
import { validarJWT } from "../middlewares/validar-jwt.js";
import categoriaControllers from '../controllers/categoria.js'
import helperCategoria from "../helpers/categorias.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import checkRol from "../middlewares/rol.js";

const router = Router()

router.get('/', validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),  categoriaControllers.categoriaGet)
router.get('/act', validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),  categoriaControllers.categoriaGetAct)
router.get('/query', [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
 
  validarCampos
], categoriaControllers.categoriaGetQuery)
//router.get('/id', categoriaControllers.categoriaGetById)
router.get('/id/:id', [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
], categoriaControllers.categoriaGetById)



router.post('/', [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
  check("nombre", 'El nombre no puede superar los 20 caracteres').isLength({max:20}),
  check("descripcion", 'La descripcion es obligatoria').trim().not().isEmpty(),
  check("descripcion", 'La descripcion no puede superar los 250 caracteres').isLength({max:250}),
  check('nombre',).custom(helperCategoria.existeCategoriaByNombre),
  validarCampos
], categoriaControllers.categoriaPost)



router.put("/:id", [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
  check("nombre", 'El nombre no puede superar los 20 caracteres').isLength({max:20}),
  check("descripcion", 'La descripcion es obligatoria').trim().not().isEmpty(),
  check("descripcion", 'La descripcion no puede superar los 250 caracteres').isLength({max:250}),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos
], categoriaControllers.categoriaPut)

router.put("/activar/:id", [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos
], categoriaControllers.categoriaPutActivar)

router.put("/desactivar/:id", [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos                             //validar que sea un mongoId 
], categoriaControllers.categoriaPutDesActivar)



router.delete("/:id", [validarJWT,checkRol(["ADMINISTRADOR", "ALMACENISTA"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos
], categoriaControllers.categoriaDelete)

export default router