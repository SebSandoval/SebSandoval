import mongoose from 'mongoose'

const IngresoSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true,
    },
    proveedor:
        { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true, },

    tipoComprobante: {
        type: String,
        required: true,
    },
    serieComprobante: {
        type: Number,
        required: true,
    },

    impuesto: {
        type: Number,
    },
    total: {
        type: Number,
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

export default mongoose.model("Ingreso", IngresoSchema)