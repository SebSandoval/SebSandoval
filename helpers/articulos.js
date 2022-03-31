
import Articulo from "../models/articulo.js"
const helperArticulo = {
    
    existeArticuloById: async (id,) => {
        const existe = await Articulo.findById(id)

        if (!existe) {
            throw new Error(`El id: ${id} no existe `)
        }
        
        
    },
    existeArticuloByCodigo: async (codigo) => {
        const existe = await Articulo.findOne({codigo})

        if (existe) {
            throw new Error(`El codigo: ${codigo} ya existe `)
        }
    },
     existeArticuloByNombre: async (nombre) => {
        const existe = await Articulo.findOne({nombre})

        if (existe) {
            throw new Error(`Ya existe articulo con el nombre:  ${nombre}`)
        }
    },
    articuloStock: async(stock)=>{
        const existe= await Articulo.findOne({stock})
        
        if(existe){
            throw new Error(`el Stock debe ser mayor a 0`)
        }
    },
    articuloprecioVenta: async(precioVenta)=>{
        const existe= await Articulo.findOne({precioVenta})
        
        if(existe){
            throw new Error(`el precioVenta debe ser mayor a 0`)
        }
    }
 
}


export default helperArticulo