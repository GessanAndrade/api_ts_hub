import express = require("express");
import pedidoVendaController from "../controller/pedidoVendaController";

const newRouter = express.Router();

newRouter.route("/api/v1/pedido").get(pedidoVendaController.get);
newRouter.route("/api/v1/pedido/:id").get(pedidoVendaController.getById);
newRouter.route("/api/v1/pedido/search/:term").get(pedidoVendaController.search);
newRouter.route("/api/v1/pedido").post(pedidoVendaController.create);
newRouter.route("/api/v1/pedido/:id").put(pedidoVendaController.update);
newRouter.route("/api/v1/pedido/:id").delete(pedidoVendaController.delete);

export default newRouter;
