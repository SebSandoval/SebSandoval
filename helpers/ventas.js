

import Venta from "../models/venta.js"
import Articulo from "../models/articulo.js"
const helperVenta = {
    existeVentaById: async (id) => {
        const existe = await Venta.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    /* existeVentaByNombre: async (nombre) => {
        const existe = await Venta.findOne({nombre})

        if (existe) {
            throw new Error(`Ya existe Venta con el nombre:  ${nombre}`)
        }
    }, */
 
     articuloStockSuficiente: async(stock)=>{
        
            }  
}


export default helperVenta