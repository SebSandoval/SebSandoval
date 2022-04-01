import proveedorControllers from "../controllers/proveedor.js"
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helperProveedor from "../helpers/proveedor.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.get('/', proveedorControllers.proveedorGet)

router.get('/query', [validarJWT,
    check('query', 'Los campos son obligatorios').not().isEmpty(),
    validarCampos
], proveedorControllers.proveedorGetQuery)

router.get('/id/:id', [ validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
], proveedorControllers.proveedorGetById)



router.post('/', [validarJWT,
    check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
    check("tipoPersona", 'El tipo de persona es obligatorio').trim().not().isEmpty(),
    check("tipoDocumento", 'El tipo de documento es obligatorio').trim().not().isEmpty(),
    check("numeroDocumento", 'El numero de documento es obligatorio').trim().not().isEmpty(),
    check("direccion", 'la direccion es obligatoria').trim().not().isEmpty(),
    check("telefono", 'El telefono es obligatorio').trim().not().isEmpty(),
    check('email', 'El correo no es valido').trim().isEmail(),
    check('email').custom(helperProveedor.existeProveedorByemail),
    check('numeroDocumento').custom(helperProveedor.existeProveedorBynumeroDocumento),
    validarCampos
], proveedorControllers.proveedorPost)




router.put("/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check("tipoPersona", 'El tipo de persona es obligatorio').trim().not().isEmpty(),
    check("tipoDocumento", 'El tipo de documento es obligatorio').trim().not().isEmpty(),
    check("numeroDocumento", 'El numero de documento es obligatorio').trim().not().isEmpty(),
    check("direccion", 'la direccion es obligatoria').trim().not().isEmpty(),
    check("telefono", 'El telefono es obligatorio').trim().not().isEmpty(),
    check('email', 'El correo no es valido').trim().isEmail(),
    check('id',).custom(helperProveedor.existeProveedorById),
    check('numeroDocumento',).custom(helperProveedor.existeProveedorBynumeroDocumento),
    check('email',).custom(helperProveedor.existeProveedorByemail),
    validarCampos
], proveedorControllers.proveedorPut)

router.put("/activar/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos
], proveedorControllers.proveedorPutActivar)

router.put("/desactivar/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos                             //validar que sea un mongoId 
], proveedorControllers.proveedorPutDesActivar)

router.delete('/:id', [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos
], proveedorControllers.proveedorDelete)

export default router