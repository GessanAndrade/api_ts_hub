import * as mongoose from "mongoose";
import pedidoVendaSchema from "../models/pedidoVendaSchema";

//Ele irá criar no mongodb uma colection e vai alimentar com os dados de NewsSchema
export default mongoose.model("t_pedidos", pedidoVendaSchema);