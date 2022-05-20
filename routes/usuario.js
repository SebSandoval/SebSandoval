import usuarioControllers from "../controllers/usuario.js"
import { Router } from "express";
import { check } from "express-validator";
import helperUsuario from "../helpers/usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import checkRol from "../middlewares/rol.js";

const router = Router()

router.get('/',validarJWT, checkRol(["ADMINISTRADOR"]) ,usuarioControllers.usuarioGet)



router.post('/login', [

    check('email', 'El correo no es valido').trim().isEmail(),
    check('password', 'El password es obligatorio').trim().not().isEmpty(),
    validarCampos
   
], usuarioControllers.usuarioLogin)



router.get('/query', [validarJWT,checkRol(["ADMINISTRADOR"]),
    validarCampos

], usuarioControllers.usuarioGetQuery)



router.get('/id/:id', [validarJWT  ,validarJWT,checkRol(["ADMINISTRADOR"]),
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperUsuario.existeUsuarioById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
], usuarioControllers.usuarioGetById)

router.post('/',[ 
    check('rol', 'El rol es obligatorio').trim().not().isEmpty(),
    check('rol','El rol no puede exceder los 20 caracteres').isLength({max:20}),
    check('nombre','El nombre es obligatorio').trim().not().isEmpty(),
    check('nombre','El nombre no puede exceder los 50 caracteres').isLength({max:50}),
    check('password', 'El password debe ser de mas de 6 caracteres').isLength({min:6}),
    check('email', 'El correo no es valido').trim().isEmail(),
    check('email','El email no puede exceder los 50 caracteres').isLength({max:50}),
    check('email').custom(helperUsuario.existeUsuarioByemail),
    validarCampos
], usuarioControllers.usuarioPost),


router.put("/:id", [validarJWT  ,
    check('id', 'No es un mongoID ').isMongoId(),
    check('rol', 'El rol es obligatorio').trim().not().isEmpty(),
    check('rol','El rol no puede exceder los 20 caracteres').isLength({max:20}),

    check('nombre','El nombre es obligatorio').trim().not().isEmpty(),
    check('nombre','El nombre no puede exceder los 50 caracteres').isLength({max:50}),
    //check('password', 'El password debe ser de mas de 6 caracteres').isLength({min:6}),
    check('email', 'El correo no es valido').trim().isEmail(),
    check('email','El email no puede exceder los 50 caracteres').isLength({max:50}),
    check('email').custom(helperUsuario.existeUsuarioByemail),
    check('id',).custom(helperUsuario.existeUsuarioById),
    validarCampos
], usuarioControllers.usuarioPut)




router.put("/activar/:id", [validarJWT  ,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperUsuario.existeUsuarioById),
    validarCampos
], usuarioControllers.usuarioPutActivar)

router.put("/desactivar/:id", [validarJWT  ,
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
