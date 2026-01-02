import express = require("express");
import movimentacaoMesController from "../controller/movimentacaoMesController";

const newRouter = express.Router();

newRouter.route("/api/v1/movimentacaomes").get(movimentacaoMesController.get);
newRouter.route("/api/v1/movimentacaomes/:id").get(movimentacaoMesController.getById);
newRouter.route("/api/v1/movimentacaomes/search/:term").get(movimentacaoMesController.search);
newRouter.route("/api/v1/movimentacaomes").post(movimentacaoMesController.create);
newRouter.route("/api/v1/movimentacaomes/:id").put(movimentacaoMesController.update);
newRouter.route("/api/v1/movimentacaomes/:id").delete(movimentacaoMesController.delete);

export default newRouter;
