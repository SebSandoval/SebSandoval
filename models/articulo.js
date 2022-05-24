import mongoose from 'mongoose'



const ArticuloSchema = mongoose.Schema({
    codigo: {
        type: Number,
        unique: true,
        
    },
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        maxlength: 20,
        unique: true
    },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria',  },
    stock: {
        type: Number,
        default: 0
    },
    impuesto: {
        type: Number,
    },
    precioVenta: {
        type: Number,
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 100
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

export default mongoose.model("Articulo", ArticuloSchema)