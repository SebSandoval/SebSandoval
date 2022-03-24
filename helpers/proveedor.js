import Proveedor from "../models/proveedor.js"
const helperProveedor = {
    existeProveedorById: async (id) => {
        const existe = await Proveedor.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    existeProveedorByNombre: async (nombre) => {
        const existe = await Proveedor.findOne({nombre})

        if (existe) {
            throw new Error(`Ya existe Proveedor con el nombre:  ${nombre}`)
        }
    },
 

}


export default helperProveedor