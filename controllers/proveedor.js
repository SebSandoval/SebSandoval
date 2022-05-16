
import Proveedor from "../models/proveedor.js"

const proveedorControllers = {




  proveedorPost: async (req, res) => {
    const { nombre, tipoPersona, numeroDocumento,  tipoDocumento, direccion, telefono, email } = req.body
    const proveedor = new Proveedor({ nombre, tipoPersona, numeroDocumento, tipoDocumento, direccion, telefono, email  })
    await proveedor.save()
    res.json(proveedor)
  },


  proveedorGet: async (req, res = response) => {
    const proveedor = await Proveedor.find()
      
      .sort({ 'createdAt': -1 })
    res.json({
      proveedor
    })
  },
  proveedorGetAct: async (req, res = response) => {
    const proveedor = await Proveedor.find({estado:1})
      
      .sort({ 'createdAt': -1 })
    res.json({
      proveedor
    })
  },
  proveedorGetQuery: async (req, res = response) => {
    const query = req.query.query;
    const proveedor = await Proveedor.find({
      $or: [
        { nombre: new RegExp(query, 'i') }
      ]
    })//param1 la busquea, param2 prop filtradas , si dejo nombre:1 solo muestra nombre tambien con {nombre:0} lo puedo quitar ojo llaves
      .sort({ 'createdAt': -1 })  //descendente  1 para ascendente
    //const proveedor=await proveedor.find({},{nombre:1});//solo muestra el nombre
    res.json({
      proveedor
    })
  },
  proveedorGetById: async (req, res) => {
    //const {id}= req.query
    const { id } = req.params
    const proveedor = await Proveedor.findOne({ _id: id })
    res.json({
      proveedor
    })
  },




  proveedorPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, ...resto } = req.body;
    const proveedor = await Proveedor.findByIdAndUpdate(id, resto);
    res.json({
      proveedor
    })
  },


  proveedorPutActivar: async (req, res) => {
    const { id } = req.params;
    const proveedor = await Proveedor.findByIdAndUpdate(id, { estado: 1 });

    res.json({
      proveedor
    })
  },
  proveedorPutDesActivar: async (req, res) => {
    const { id } = req.params;
    const proveedor = await Proveedor.findByIdAndUpdate(id, { estado: 0 });

    res.json({
      proveedor
    })
  },


  proveedorDelete: async (req, res) => {
    const { id } = req.params;
    const proveedor = await Proveedor.findByIdAndDelete(id);
    res.json({
      proveedor
    })
  }

}

export default proveedorControllers