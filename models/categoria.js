import mongoose from 'mongoose'

const CategoriaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required : [true, "El nombre es obligatorio"],
        maxlength:20,
        unique:true
    },
    descripcion: {
        type: String,
        required : [true, "La descripcion es obligatoria"],
        maxlength:250
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

export default mongoose.model("Categoria", CategoriaSchema)