import Ingreso from "../models/ingreso.js"
const helperIngreso = {
    
    existeIngresoById: async (id) => {
        const existe = await Ingreso.findById(id)

        if (!existe) {
            throw new Error(`El id: ${id} no existe `)
        }
    },
   
}


export default helperIngreso