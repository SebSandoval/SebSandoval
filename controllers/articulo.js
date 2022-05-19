

import Articulo from "../models/articulo.js"

const articuloControllers = {




  articuloPost: async (req, res) => {
    const { codigo, nombre, categoria, stock, impuesto, precioVenta, descripcion } = req.body
    const articulo = new Articulo({ codigo, nombre, categoria, stock, impuesto, precioVenta, descripcion })
    await articulo.save()
    res.json(articulo)
  },


  articuloGet: async (req, res = response) => {


    const articulo = await Articulo.find()
      .populate('categoria', 'nombre')
      .sort({ 'createdAt': -1 })
    res.json({
      articulo
    })
  },
  articuloGetAct: async (req, res = response) => {
    const articulo = await Articulo.find({ estado: 1 })
      .populate('categoria', 'nombre')
      .sort({ 'createdAt': -1 })
    res.json({
      articulo
    })
  },



  articuloGetQuery: async (req, res = response) => {
    const query = req.query.query
    const articulo = await Articulo.find({
      estado: 1,
      $or: [
        { nombre: new RegExp(query, 'i') },
        { descripcion: new RegExp(query, 'i') }

      ]
    })
      .sort({ 'createdAt': -1 })
    res.json({ articulo })
  },
  articuloGetById: async (req, res) => {
    //const {id}= req.query
    const { id } = req.params
    const articulo = await Articulo.findOne({ _id: id })
    res.json({
      articulo
    })
  },


  articuloPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, estado, codigo, ...resto } = req.body;
    const articulo = await Articulo.findByIdAndUpdate(id, resto);
    res.json({
      articulo
    })
  },


  articuloPutActivar: async (req, res) => {
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate(id, { estado: 1 });

    res.json({
      articulo
    })
  },
  articuloPutDesActivar: async (req, res) => {
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate(id, { estado: 0 });

    res.json({
      articulo
    })
  },
  articuloDelete: async (req, res) => {
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndDelete(id);
    res.json({
      articulo
    })
  }

}

export default articuloControllers