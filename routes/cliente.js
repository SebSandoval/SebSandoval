import clienteControllers from "../controllers/cliente.js"
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helperCliente from "../helpers/clientes.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
const router = Router()

router.get('/', validarJWT,  clienteControllers.clienteGet)

router.get('/query', [validarJWT,
    check('query', 'Los campos son obligatorios').not().isEmpty(),
    validarCampos
  ], clienteControllers.clienteGetQuery)

  router.get('/id/:id', [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperCliente.existeClienteById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
  ], clienteControllers.clienteGetById)

router.post('/',[validarJWT,
    check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
    check("tipoPersona", 'El tipo de persona es obligatorio').trim().not().isEmpty(),
    check("tipoDocumento", 'El tipo de documento es obligatorio').trim().not().isEmpty(),
    check("numeroDocumento", 'El numero de documento es obligatorio').trim().not().isEmpty(),
    check("direccion", 'la direccion es obligatoria').trim().not().isEmpty(),
    check("telefono", 'El telefono es obligatorio').trim().not().isEmpty(),
    check('email', 'El correo no es valido').trim().isEmail(),
    check('email',).custom(helperCliente.existeClienteByEmail),
    check('numeroDocumento',).custom(helperCliente.existeClienteBynumeroDocumento),


    
    validarCampos
  ], clienteControllers.clientePost)


router.put("/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperCliente.existeClienteById),
    check("tipoPersona", 'El tipo de persona es obligatorio').trim().not().isEmpty(),
    check("tipoDocumento", 'El tipo de documento es obligatorio').trim().not().isEmpty(),
    check("numeroDocumento", 'El numero de documento es obligatorio').trim().not().isEmpty(),
    check("direccion", 'la direccion es obligatoria').trim().not().isEmpty(),
    check("telefono", 'El telefono es obligatorio').trim().not().isEmpty(),
    check('email', 'El correo no es valido').trim().isEmail(),
    check('email',).custom(helperCliente.existeClienteByEmail),
    check('numeroDocumento',).custom(helperCliente.existeClienteBynumeroDocumento),

    validarCampos
  ], clienteControllers.clientePut)

  router.put("/activar/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperCliente.existeClienteById),
    validarCampos
  ], clienteControllers.clientePutActivar)
  
  router.put("/desactivar/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperCliente.existeClienteById),
    validarCampos                             //validar que sea un mongoId 
  ], clienteControllers.clientePutDesActivar)



router.delete('/:id', [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperCliente.existeClienteById),
    validarCampos
  ], clienteControllers.clienteDelete)

export default router