
import Ingreso from "../models/ingreso.js"
import Articulo from "../models/articulo.js"

const ingresoControllers = {



  ingresoPost: async (req, res) => {
    const { usuario, proveedor, tipoComprobante, serieComprobante, numeroComprobante,    impuesto,  detalles  } = req.body
    const fecha = new Date(Date.now() + (-1*new Date().getTimezoneOffset()*60000)).toISOString()
    
    
    const ingreso = new Ingreso({  usuario, proveedor, tipoComprobante, serieComprobante, numeroComprobante, fecha, impuesto,  detalles  })
    ingreso.detalles.forEach( async (e)=> {
      e.subtotal = e.cantidadProducto* e.precioProducto    
      let { stock } = await Articulo.findById({ _id:e._id });
      stock = stock + e.cantidadProducto        
      await Articulo.findByIdAndUpdate(e._id, { stock })  
    })
    ingreso.total = ingreso.detalles.reduce((x, y) => x += y.subtotal, 0)
    



    await ingreso.save()
    res.json(ingreso)
  },



  ingresoGet: async (req, res = response) => {
    const ingreso = await Ingreso.find()
    .populate('usuario', 'nombre')
    .populate('proveedor', 'nombre')
      .sort({ 'createdAt': -1 })
  res.json({
        ingreso
      })
  },



  ingresoGetQuery: async (req, res = response) => {
    const query = req.query.query;
    const ingreso = await Ingreso.find({
      $or: [
        { usuario: new RegExp(query, 'i') },
        { proveedor: new RegExp(query, 'i') },
        
      ]
    })//param1 la busquea, param2 prop filtradas , si dejo nombre:1 solo muestra nombre tambien con {nombre:0} lo puedo quitar ojo llaves
      .sort({ 'createdAt': -1 })  //descendente  1 para ascendente
    //const ingreso=await ingreso.find({},{nombre:1});//solo muestra el nombre
    res.json({
      ingreso
    })
  },
  ingresoGetById: async (req, res) => {
    //const {id}= req.query
    const { id } = req.params
    const ingreso = await Ingreso.findOne({ _id: id })
    res.json({
      ingreso
    })
  },


  ingresoPut: async (req, res )=>{
    const{id} = req.params;
    const {_id, createdAt, estado,... resto} = req.body;
    const ingreso = await Ingreso.findByIdAndUpdate(id, resto);
    res.json({
      ingreso
    })
  },


  ingresoPutActivar: async (req, res) => {
    const { id } = req.params;
    const ingreso = await Ingreso.findByIdAndUpdate(id, { estado: 1 });
    ingreso.detalles.forEach( async (e)=> {
      let { stock } = await Articulo.findById({ _id:e._id });
      stock = stock + e.cantidadProducto        
      await Articulo.findByIdAndUpdate(e._id, { stock })  
    })
    res.json({
      ingreso
    })
  },
  
  ingresoPutDesActivar: async (req, res) => {
    const { id } = req.params;
    const ingreso = await Ingreso.findByIdAndUpdate(id, { estado: 0 });
    ingreso.detalles.forEach( async (e)=> {
      let { stock } = await Articulo.findById({ _id:e._id });
      stock = stock - e.cantidadProducto        
      await Articulo.findByIdAndUpdate(e._id, { stock })  
    })
    res.json({
      ingreso
    })
  },

  ingresoDelete: async(req, res)=>{
    const {id}= req. params;
    const ingreso = await Ingreso.findByIdAndDelete(id);
    res.json({
      ingreso
    })
  }

}

export default ingresoControllers