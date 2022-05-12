
import Cliente from "../models/cliente.js"

const clienteControllers = {




  clientePost: async (req, res) => {
    const { nombre, tipoPersona, numeroDocumento,  tipoDocumento, direccion, telefono, email } = req.body
    const cliente = new Cliente({ nombre, tipoPersona, numeroDocumento, tipoDocumento, direccion, telefono, email  })
    await cliente.save()
    res.json(cliente)
  },


  clienteGet: async (req, res = response) => {
    const cliente = await Cliente.find()
      
      .sort({ 'createdAt': -1 })
    res.json({
      cliente
    })
  },
  clienteGetAct: async (req, res = response) => {
    const cliente = await Cliente.find({estado:1})
      
      .sort({ 'createdAt': -1 })
    res.json({
      cliente
    })
  },

  clienteGetQuery: async (req, res = response) => {
    const query = req.query.query;
    const cliente = await Cliente.find({
      $or: [
        { nombre: new RegExp(query, 'i') },
        { descripcion: new RegExp(query, 'i') },
      ]
    })//param1 la busquea, param2 prop filtradas , si dejo nombre:1 solo muestra nombre tambien con {nombre:0} lo puedo quitar ojo llaves
      .sort({ 'createdAt': -1 })  //descendente  1 para ascendente
    //const cliente=await cliente.find({},{nombre:1});//solo muestra el nombre
    res.json({
      cliente
    })
  },
  clienteGetById: async (req, res) => {
    //const {id}= req.query
    const { id } = req.params
    const cliente = await Cliente.findOne({ _id: id })
    res.json({
      cliente
    })
  },

  clientePut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt,numeroDocumento, ...resto } = req.body;
    const cliente = await Cliente.findByIdAndUpdate(id, resto);
    res.json({
      cliente
    })
  },

  clientePutActivar: async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndUpdate(id, { estado: 1 });

    res.json({
      cliente
    })
  },
  clientePutDesActivar: async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndUpdate(id, { estado: 0 });

    res.json({
      cliente
    })
  },



  clienteDelete: async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndDelete(id);
    res.json({
      cliente
    })
  }

}

export default clienteControllers