
import Cliente from "../models/cliente.js"

const helperCliente = {
    
    existeClienteById: async (id) => {
        const existe = await Cliente.findById(id)

        if (!existe) {
            throw new Error(`El id: ${id} no existe `)
        }
    },
    existeClienteByNombre: async (nombre) => {
        const existe = await Cliente.findOne({nombre})

        if (existe) {
            throw new Error(`Ya existe Cliente con el nombre:  ${nombre}`)
        }
    },

}


export default helperCliente