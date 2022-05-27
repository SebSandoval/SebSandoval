

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
    existeVentaByNumero: async (numeroComprobante) => {
        const existe = await Venta.findOne({ numeroComprobante })

        if (existe) {
            throw new Error(`El numero de Comprobante: ${numeroComprobante} ya existe `)
        }
    },
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

    validacionesDetalles: async (detalles) => {
        if (detalles) {
            for (let i = 0; i < detalles.length; i++) {
                const detalle = detalles[i];
                if (detalle.cantidadProducto <= 0 && detalle.cantidadProducto == "") {
                    throw new Error(`la cantidad del articulo: '${detalle.nombreProducto}' debe ser mayor a 0`)
                } else if (detalle.nombreProducto == "") {
                    throw new Error(`El nombre del articulo no puede estar vacio`)
                }
                else if (detalle.precioProducto == "") {
                    throw new Error(`El precio del articulo no puede estar vacio`)
                }
                else if (detalle.descuentoProducto < 0 || detalle.descuentoProducto > 100) {
                    throw new Error(`Descuento incorrecto`)
                }
            }
        }
    },
    detallesVacio: async (detalles, next) => {

   if(detalles.length ==0){
    throw new Error(`Agregue productos a la venta`)
   }
    },




}


export default helperVenta