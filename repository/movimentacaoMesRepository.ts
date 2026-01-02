import * as mongoose from "mongoose";
import movimentacaoMesSchema from "../models/movimentacaoMesSchema";

//Ele irá criar no mongodb uma colection e vai alimentar com os dados de NewsSchema
export default mongoose.model("t_movimentacoes", movimentacaoMesSchema);