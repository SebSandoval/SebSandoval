import Ingreso from "../models/ingreso.js"
const helperIngreso = {
    
    existeIngresoById: async (id) => {
        const existe = await Ingreso.findById(id)

        if (!existe) {
            throw new Error(`El id: ${id} no existe `)
        }
    },
    cantidadIngreso: async (detalles) => {
        if(detalles){
            for (let i = 0; i < detalles.length; i++) {
                const detalle = detalles[i];
                if(detalle.cantidadProducto <=0){
                    throw new Error(`la cantidad del articulo: '${detalle.nombreProducto}' debe ser mayor a 0`)
                }
            }
        }
},
}


export default helperIngreso