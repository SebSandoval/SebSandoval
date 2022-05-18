

import Venta from "../models/venta.js"
import Articulo from "../models/articulo.js"
const helperVenta = {
    existeVentaById: async (id) => {
        const existe = await Venta.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    /* existeVentaByNombre: async (nombre) => {
        const existe = await Venta.findOne({nombre})

        if (existe) {
            throw new Error(`Ya existe Venta con el nombre:  ${nombre}`)
        }
    }, */

    articuloStockSuficiente: () => {

        return async (req, res, next) => {
            const { detalles } = req.body
            if (detalles) {

                detalles.forEach(async (detalle) => {
                    const articulo = await Articulo.findById(detalle._id)
                    if (articulo) {
                        if ((articulo.stock - detalle.cantidadProducto) < 0) {
                            throw new Error("Stock insuficiente " + articulo.nombre)
                        }
                    }

                })
            }
            next()
        }



    },

    articuloStock: async (detalles) => {

        if (detalles) {
            for (let i = 0; i < detalles.length; i++) {
                const detalle = detalles[i]
                const articulo = await Articulo.findById(detalle._id)
                if (articulo) {
                    if ((articulo.stock - detalle.cantidadProducto) < 0) {
                        throw new Error(`Stock insuficiente del articulo: ${articulo.nombre}`)
                    }
                }

            }

        }

    },

    cantidadVenta: async (detalles) => {
        if(detalles){
            for (let i = 0; i < detalles.length; i++) {
                const detalle = detalles[i];
                if(detalle.cantidadProducto <=0){
                    throw new Error(`la cantidad del articulo: '${detalle.nombreProducto}' debe ser mayor a 0`)
                }
            }
        }
    }




}


export default helperVenta