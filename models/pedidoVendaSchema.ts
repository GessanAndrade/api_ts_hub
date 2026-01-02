import * as mongoose from "mongoose";

const pedidoVendaSchema = new mongoose.Schema({
    numPedido: {type: Number},
    status: {type: String},
    valor: {type: Number},
});

export default pedidoVendaSchema;