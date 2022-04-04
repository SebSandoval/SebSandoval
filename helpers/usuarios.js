import Usuario from "../models/usuario.js"


const helperUsuario = {
    existeUsuarioById: async (id, req) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
        req.req.usuario = existe
    },
   
    existeUsuarioByemail: async (email, req) => {
        const existe = await Usuario.findOne({email})

        if (req.req.method === "POST") {
            if (existe) {
                throw new Error(`Ya existe usuario con el email:  ${email}`)
            }
        } else if (req.req.method === "PUT") {
            if (existe) {
                if (req.req.usuario.email != existe.email) {
                    throw new Error(`Ya existe usuario con el email:  ${email}`)
                }
            }
        }
    },


}


export default helperUsuario