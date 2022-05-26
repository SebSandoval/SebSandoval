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
existeIngresoByNumero: async (numeroComprobante) => {
    const existe = await Ingreso.findOne({ numeroComprobante })

    if (existe) {
        throw new Error(`El numero de Comprobante: ${numeroComprobante} ya existe `)
    }
},

validacionesDetalles: async (detalles) => {
    if(detalles){
        for (let i = 0; i < detalles.length; i++) {
            const detalle = detalles[i];
            if(detalle.cantidadProducto <=0 && detalle.cantidadProducto=="" ){
                throw new Error(`la cantidad del articulo: '${detalle.nombreProducto}' debe ser mayor a 0`)
            } else if(detalle.nombreProducto==""){
                throw new Error(`El nombre del articulo no puede estar vacio`)
            }
            else if(detalle.precioProducto==""){
                throw new Error(`El precio del articulo no puede estar vacio`) 
            }
            else if(detalle.descuentoProducto<0 || detalle.descuentoProducto>100){
                throw new Error(`Descuento incorrecto`) 
            }
        }
    }
}
}


export default helperIngreso