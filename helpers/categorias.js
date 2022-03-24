import Categoria from "../models/categoria.js"
//import Articulo from "../models/articulo.js"
const helperCategoria = {
    existeCategoriaById: async (id) => {
        const existe = await Categoria.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    existeCategoriaByNombre: async (nombre) => {
        const existe = await Categoria.findOne({nombre})

        if (existe) {
            throw new Error(`Ya existe categoria con el nombre:  ${nombre}`)
        }
    },
   /*  existeArticuloById: async (id) => {
        const existe = await Articulo.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
 */

}


export default helperCategoria