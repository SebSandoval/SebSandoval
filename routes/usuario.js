import usuarioControllers from "../controllers/usuario.js"
import { Router } from "express";
import { check } from "express-validator";
import helperUsuario from "../helpers/usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";
const router = Router()

router.get('/', usuarioControllers.usuarioGet)



router.post('/login', [
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
   
], usuarioControllers.usuarioLogin)



router.get('/query', [
    check('query', 'Los campos son obligatorios').not().isEmpty(),
    validarCampos

], usuarioControllers.usuarioGetQuery)


router.get('/id/:id', [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperUsuario.existeUsuarioById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
], usuarioControllers.usuarioGetById)

router.post('/',[
    check('rol', 'El rol es obligatorio').trim().not().isEmpty(),
    check('nombre','El nombre es obligatorio').trim().not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 caracteres').isLength({min:6}),
    check('email', 'El correo no es valido').trim().isEmail(),
    check('nombre').custom(helperUsuario.existeUsuarioByNombre),
    check('email').custom(helperUsuario.existeUsuarioByemail),
    validarCampos
], usuarioControllers.usuarioPost),


router.put("/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperUsuario.existeUsuarioById),
    validarCampos
], usuarioControllers.usuarioPut)




router.put("/activar/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperUsuario.existeUsuarioById),
    validarCampos
], usuarioControllers.usuarioPutActivar)

router.put("/desactivar/:id", [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperUsuario.existeUsuarioById),
    validarCampos                             //validar que sea un mongoId 
], usuarioControllers.usuarioPutDesActivar)




router.delete('/:id', [
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperUsuario.existeUsuarioById),
    validarCampos
], usuarioControllers.usuarioDelete)

export default router