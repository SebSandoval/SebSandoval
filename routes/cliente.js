import clienteControllers from "../controllers/cliente.js"
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helperCliente from "../helpers/clientes.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import checkRol from "../middlewares/rol.js";
const router = Router()

router.get('/', validarJWT, checkRol(["ADMINISTRADOR", "VENDEDOR"]), clienteControllers.clienteGet)
router.get('/act', validarJWT, checkRol(["ADMINISTRADOR", "VENDEDOR"]), clienteControllers.clienteGetAct)

router.get('/query', [validarJWT,
  validarCampos
], clienteControllers.clienteGetQuery)

router.get('/id/:id', [validarJWT, checkRol(["ADMINISTRADOR", "VENDEDOR"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCliente.existeClienteById),
  validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
], clienteControllers.clienteGetById)

router.post('/', [validarJWT, checkRol(["ADMINISTRADOR", "VENDEDOR"]),

  check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
  check("nombre", 'El nombre no puede exceder los 50 caracteres').isLength({
    max: 50
  }),

  check("tipoDocumento", 'El tipo de documento es obligatorio').trim().not().isEmpty(),
  check("numeroDocumento", 'El numero de documento es obligatorio').trim().not().isEmpty(),
  check("numeroDocumento", 'El numero de documento no puede exceder los 20 caracteres').isLength({
    max: 20
  }),
  check("direccion", 'la direccion es obligatoria').trim().not().isEmpty(),
  check("direccion", 'la direccion no debe ser mayor a 50 caracteres').isLength({
    max: 50
  }),
  check("telefono", 'El telefono es obligatorio').trim().not().isEmpty(),
  check("telefono", 'El telefono no debe ser mayor a 20 caracteres').isLength({
    max: 20
  }),
  check('email', 'El correo no es valido').trim().isEmail(),
  check('email', 'El correo no debe ser mayor a 50 caracteres').isLength({
    max: 50
  }),
  check('email',).custom(helperCliente.existeClienteByEmail),
  check('numeroDocumento',).custom(helperCliente.existeClienteBynumeroDocumento),



  validarCampos
], clienteControllers.clientePost)



router.put("/:id", [validarJWT, checkRol(["ADMINISTRADOR", "VENDEDOR"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCliente.existeClienteById),
  check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
  check("nombre", 'El nombre no puede exceder los 50 caracteres').isLength({
    max: 50
  }),
  check("tipoPersona", 'El tipo de persona es obligatorio').trim().not().isEmpty(),
  check("tipoDocumento", 'El tipo de documento es obligatorio').trim().not().isEmpty(),
  check("numeroDocumento", 'El numero de documento es obligatorio').trim().not().isEmpty(),
  check("numeroDocumento", 'El numero de documento no puede exceder los 50 caracteres').isLength({
    max: 20
  }),
  check("direccion", 'la direccion es obligatoria').trim().not().isEmpty(),
  check("direccion", 'la direccion no debe ser mayor a 50 caracteres').isLength({
    max: 50
  }),
  check("telefono", 'El telefono es obligatorio').trim().not().isEmpty(),
  check("telefono", 'El telefono no debe ser mayor a 20 caracteres').isLength({
    max: 20
  }),
  check('email', 'El correo no es valido').trim().isEmail(),
  check('email', 'El correo no debe ser mayor a 50 caracteres').isLength({
    max: 50
  }),
  check('email',).custom(helperCliente.existeClienteByEmail),
  check('numeroDocumento',).custom(helperCliente.existeClienteBynumeroDocumento),

  validarCampos
], clienteControllers.clientePut)

router.put("/activar/:id", [validarJWT,checkRol(["ADMINISTRADOR", "VENDEDOR"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCliente.existeClienteById),

  validarCampos
], clienteControllers.clientePutActivar)

router.put("/desactivar/:id", [validarJWT,checkRol(["ADMINISTRADOR", "VENDEDOR"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCliente.existeClienteById),
  validarCampos //validar que sea un mongoId 
], clienteControllers.clientePutDesActivar)



router.delete('/:id', [validarJWT,checkRol(["ADMINISTRADOR", "VENDEDOR"]),
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCliente.existeClienteById),
  validarCampos
], clienteControllers.clienteDelete)

export default router