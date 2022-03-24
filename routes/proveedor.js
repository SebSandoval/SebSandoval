import proveedorControllers from "../controllers/proveedor.js"
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helperProveedor from "../helpers/proveedor.js";

const router = Router()

router.get('/', proveedorControllers.proveedorGet)

router.get('/query', [
    check('query', 'Los campos son obligatorios').not().isEmpty(),
    validarCampos
], proveedorControllers.proveedorGetQuery)

router.get('/id/:id', [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
], proveedorControllers.proveedorGetById)



router.post('/', [
    check("nombre", 'El nombre es obligatorio').not().isEmpty(),
    check('nombre',).custom(helperProveedor.existeProveedorByNombre),
    validarCampos
], proveedorControllers.proveedorPost)




router.put("/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos
], proveedorControllers.proveedorPut)

router.put("/activar/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos
], proveedorControllers.proveedorPutActivar)

router.put("/desactivar/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos                             //validar que sea un mongoId 
], proveedorControllers.proveedorPutDesActivar)

router.delete('/:id', [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos
], proveedorControllers.proveedorDelete)

export default router