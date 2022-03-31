
import Proveedor from "../models/proveedor.js"
const helperProveedor = {
    existeProveedorById: async (id, req) => {
        const existe = await Proveedor.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
        req.req.proveedor = existe
    },
    existeProveedorByemail: async (email, req) => {
        const existe = await Proveedor.findOne({ email })
        if (req.req.method === "POST") {
            if (existe) {
                throw new Error(`Ya existe proveedor con el email:  ${email}`)
            }
        } else if (req.req.method === "PUT") {
            if (existe) {
                if (req.req.proveedor.email != existe.email) {
                    throw new Error(`Ya existe proveedor con el email:  ${email}`)
                }
            }
        }


    },



    existeProveedorBynumeroDocumento: async (numeroDocumento, req) => {
        console.log(numeroDocumento);
        const existe = await Proveedor.findOne({ numeroDocumento })
        if (req.req.method === "POST") {
            if (existe) {
                throw new Error(`Ya existe proveedor con el numero de documento:  ${numeroDocumento}`)
            }
        } else if (req.req.method === "PUT") {
            if (existe) {
                if (req.req.proveedor.numeroDocumento != existe.numeroDocumento) {
                    throw new Error(`Ya existe proveedor con el numero de documento:  ${numeroDocumento}`)
                }
            }

        }


    },


}


export default helperProveedor