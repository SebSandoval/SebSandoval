
import Articulo from "../models/articulo.js"
const helperArticulo = {
    
    existeArticuloById: async (id) => {
        const existe = await Articulo.findById(id)

        if (!existe) {
            throw new Error(`El id: ${id} no existe `)
        }
    },
    /* existeArticuloByNombre: async (nombre) => {
        const existe = await Articulo.findOne({nombre})

        if (existe) {
            throw new Error(`Ya existe articulo con el nombre:  ${nombre}`)
        }
    },
 */
}


export default helperArticulo