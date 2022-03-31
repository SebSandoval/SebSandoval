import clienteControllers from "../controllers/cliente.js"
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helperCliente from "../helpers/clientes.js";
const router = Router()

router.get('/',clienteControllers.clienteGet)

router.get('/query', [
    check('query', 'Los campos son obligatorios').not().isEmpty(),
    validarCampos
  ], clienteControllers.clienteGetQuery)

  router.get('/id/:id', [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperCliente.existeClienteById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
  ], clienteControllers.clienteGetById)

router.post('/',[
    check("nombre", 'El nombre es obligatorio').not().isEmpty(),
    check("tipoPersona", 'El tipo de persona es obligatorio').not().isEmpty(),
    check("tipoDocumento", 'El tipo de documento es obligatorio').not().isEmpty(),
    check("numeroDocumento", 'El numero de documento es obligatorio').not().isEmpty(),
    check("direccion", 'la direccion es obligatoria').not().isEmpty(),
    check("telefono", 'El telefono es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),

    check('nombre',).custom(helperCliente.existeClienteByNombre),
    validarCampos
  ], clienteControllers.clientePost)


router.put("/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperCliente.existeClienteById),
    check("tipoPersona", 'El tipo de persona es obligatorio').not().isEmpty(),
    check("tipoDocumento", 'El tipo de documento es obligatorio').not().isEmpty(),
    check("numeroDocumento", 'El numero de documento es obligatorio').not().isEmpty(),
    check("direccion", 'la direccion es obligatoria').not().isEmpty(),
    check("telefono", 'El telefono es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),

    validarCampos
  ], clienteControllers.clientePut)

  router.put("/activar/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperCliente.existeClienteById),
    validarCampos
  ], clienteControllers.clientePutActivar)
  
  router.put("/desactivar/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperCliente.existeClienteById),
    validarCampos                             //validar que sea un mongoId 
  ], clienteControllers.clientePutDesActivar)



router.delete('/:id', [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperCliente.existeClienteById),
    validarCampos
  ], clienteControllers.clienteDelete)

export default router