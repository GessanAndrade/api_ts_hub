import * as mongoose from "mongoose";

const topProdutosSchema = new mongoose.Schema({
    produto: {type: String},
    quantidade: {type: Number},
});

export default topProdutosSchema;