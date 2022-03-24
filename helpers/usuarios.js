import Usuario from "../models/usuario.js"


const helperUsuario = {
    existeProveedorById: async (id) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    existeUsuarioByNombre: async (nombre) => {
        const existe = await Usuario.findOne({nombre})

        if (existe) {
            throw new Error(`Ya existe Usuario con el nombre:  ${nombre}`)
        }
    },
 

}


export default helperUsuario