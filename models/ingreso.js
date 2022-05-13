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
    numeroComprobante: {
      type: Number,
      required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },

    impuesto: {
        type: Number,
    },
    total: {
        type: Number,
    },
    detalles: [
        {
          _id: {
            type: String,
            required: true,
          },
          nombreProducto: {
            type: String,
            required: true,
          },
          precioProducto: {
            type: Number,
            required: true,
          },
          cantidadProducto: {
            type: Number,
            required: true,
          },
         
          subtotal: {
            type: Number,
            default: 0,
          },
        },
      ],
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