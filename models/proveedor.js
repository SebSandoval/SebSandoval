import mongoose from 'mongoose'

const ProveedorSchema = mongoose.Schema({
    nombre: {
        type: String,
        required : true,
        maxlength : 50

    },
    tipoPersona: {
        type: String,
        required : true,
    },
    tipoDocumento: {
        type: String,
        required : true,
    },
    numeroDocumento: {
        type: String,
        required : true,
        maxlength : 20,

    },
    direccion: {
        type: String,
        maxlength : 50,
    },

    telefono: {
        type: String,
        maxlength : 20,
    },
    email: {
        type: String,
        required : true,
        maxlength : 50,
        unique : true
    },
    estado: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Proveedor", ProveedorSchema)