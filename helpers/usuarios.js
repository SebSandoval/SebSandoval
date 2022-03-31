import Usuario from "../models/usuario.js"


const helperUsuario = {
    existeUsuarioById: async (id) => {
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
    existeUsuarioByemail: async (email) => {
        const existe = await Usuario.findOne({email})

        if (existe) {
            throw new Error(`Ya existe Usuario con el email:  ${email}`)
        }
    },


}


export default helperUsuario