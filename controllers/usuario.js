
import Usuario from "../models/usuario.js"
import bcryptjs from 'bcryptjs'
import { response } from "express"
import { generarJWT } from "../middlewares/validar-jwt.js"

const usuarioControllers = {


  usuarioGet: async (req, res = response) => {
    const usuario = await Usuario.find()
      
      .sort({ 'createdAt': -1 })
    res.json({
      usuario
    })
  },

  usuarioGetQuery: async (req, res = response) => {
    const query = req.query.query;
    const usuario = await Usuario.find({
      $or: [
        { nombre: new RegExp(query, 'i') }
      ]
    })//param1 la busquea, param2 prop filtradas , si dejo nombre:1 solo muestra nombre tambien con {nombre:0} lo puedo quitar ojo llaves
      .sort({ 'createdAt': -1 })  //descendente  1 para ascendente
    //const usuario=await usuario.find({},{nombre:1});//solo muestra el nombre
    res.json({
      usuario
    })
  },
  usuarioGetById: async (req, res) => {
    //const {id}= req.query
    const { id } = req.params
    const usuario = await Usuario.findOne({ _id: id })
    res.json({
      usuario
    })
  },

  usuarioPost: async (req, res) => {
    
    const { nombre, email,password, rol } = req.body
    const usuario = new Usuario({nombre, email,password, rol   })


    const  salt = bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password, salt)

    await usuario.save()
    res.json(usuario)
  },


  usuarioPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, ...resto } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
      usuario
    })
  },

 usuarioPutActivar: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 });

    res.json({
      usuario
    })
  },
  usuarioPutDesActivar: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 });

    res.json({
      usuario
    })
  },
  usuarioDelete: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    res.json({
      usuario
    })
  },

  usuarioLogin:async(req, res, response)=>{
    const {email, password} = req.body;
    
    try{
      const usuario= await Usuario.findOne({email});
      
      if(!usuario){
        return res.status(400).json({
          msg:'usuario o password incorrectos'
        })
      }
      
      const validPassword = bcryptjs.compareSync(password, usuario.password);
      if(!validPassword){
        return res.status(400).json({
          msg:'usuario o password incorrectos'
        })
      }
      if(usuario.estado==0){
        return res.status(400).json({
          msg:'Contacte al administrador'
        })
      }
      const token = await generarJWT(usuario.id);
      res.json({
        usuario, token
      })
    } catch(error){
      console.log(error);
      return res.status(400).json({
        msg:'hable con el administrador'
      })
    }
  }






}

export default usuarioControllers