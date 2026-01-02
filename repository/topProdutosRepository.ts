import * as mongoose from "mongoose";
import topProdutosSchema from "../models/topProdutosSchema";

//Ele irá criar no mongodb uma colection e vai alimentar com os dados de NewsSchema
export default mongoose.model("t_topProdutos", topProdutosSchema);