
import Venta from "../models/venta.js"
import Articulo from "../models/articulo.js"




async function disminuirStock(_id, cantidadProducto) {
  let { stock } = await Articulo.findOne({ _id });
  stock = stock - cantidadProducto;
  const reg = await Articulo.findByIdAndUpdate(_id, { stock })
}
const ventaControllers = {
  ventaPost: async (req, res) => {
    
    const { usuario, cliente, tipoComprobante, serieComprobante, numeroComprobante,total, impuesto,  detalles } = req.body
    const fecha = new Date(Date.now() + (-1*new Date().getTimezoneOffset()*60000)).toISOString()

    
    const venta = new Venta({ usuario, cliente, tipoComprobante, serieComprobante, numeroComprobante, fecha, impuesto, total, detalles })

    
    venta.detalles.forEach(async (e) => {
      e.subtotal = (e.cantidadProducto * e.precioProducto) - ((e.cantidadProducto * e.precioProducto) * e.descuentoProducto) / 100
      let { stock } = await Articulo.findById({ _id: e._id });
      stock = stock - e.cantidadProducto
      await Articulo.findByIdAndUpdate(e._id, { stock })
    })
    venta.total = venta.detalles.reduce((x, y) => x += y.subtotal, 0)
    //req.body.detalles.map( (articulo) =>  disminuirStock(articulo._id,articulo.cantidad))
    await venta.save()
    res.json(venta)
  },


  ventaGet: async (req, res = response) => {
    const venta = await Venta.find()
      .populate('usuario', ['rol', 'nombre'])
      .populate('cliente', 'nombre')
      .sort({ 'createdAt': -1 })
    res.json({
      venta
    })
  },

  /* ventaGetQuery: async (req, res = response) => {
    const query = req.query.query
    const venta = await Venta.find({
      $or: [
        { cliente: new RegExp(query, 'i') }
        

      ]
    }) 
      .sort({ 'createdAt': -1 })
    res.json({ venta })
  },*/
  ventaGetById: async (req, res) => {
    //const {id}= req.query
    const { id } = req.params
    const venta = await Venta.findOne({ _id: id })
    res.json({
      venta
    })
  },

  ventaPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, ...resto } = req.body;
    const venta = await Venta.findByIdAndUpdate(id, resto);
    res.json({
      venta
    })
  },

  ventaPutActivar: async (req, res) => {
    const { id } = req.params;
    const venta = await Venta.findByIdAndUpdate(id, { estado: 1 });
    venta.detalles.forEach(async (e) => {
      let { stock } = await Articulo.findById({ _id: e._id });
      stock = stock - e.cantidadProducto
      await Articulo.findByIdAndUpdate(e._id, { stock })
    })
    res.json({
      venta
    })
  },
  ventaPutDesActivar: async (req, res) => {
    const { id } = req.params;
    const venta = await Venta.findByIdAndUpdate(id, { estado: 0 });
    venta.detalles.forEach(async (e) => {
      let { stock } = await Articulo.findById({ _id: e._id });
      stock = stock + e.cantidadProducto
      await Articulo.findByIdAndUpdate(e._id, { stock })
    })
    res.json({
      venta
    })
  },

  ventaDelete: async (req, res) => {
    const { id } = req.params;
    const venta = await Venta.findByIdAndDelete(id);
    res.json({
      venta
    })
  }

}

export default ventaControllers


