

import Venta from "../models/venta.js"
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
 

}


export default helperVenta