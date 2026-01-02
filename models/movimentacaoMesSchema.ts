import * as mongoose from "mongoose";

const movimentacaoMesSchema = new mongoose.Schema({
    dateMov: {type: Date},
    vendas: {type: Number},
});

export default movimentacaoMesSchema;