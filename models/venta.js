import mongoose from 'mongoose'

const VentaSchema = mongoose.Schema({
    usuario: {
         type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true, },
        
    
    cliente:{ type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true, },
    tipoComprobante: {
        type: String,
        required : true,
    },
    serieComprobante: {
        type: Number,
        required : true,
    },
    numeroComprobante:{
        type:Number,
        required:true
    },
    fecha:{
        type:Date,
        default:Date.now
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

export default mongoose.model("Venta", VentaSchema)