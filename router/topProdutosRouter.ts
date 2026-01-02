import express = require("express");
import topProdutosController from "../controller/topProdutosController";

const newRouter = express.Router();

newRouter.route("/api/v1/topproduto").get(topProdutosController.get);
newRouter.route("/api/v1/topproduto/:id").get(topProdutosController.getById);
newRouter.route("/api/v1/topproduto/search/:term").get(topProdutosController.search);
newRouter.route("/api/v1/topproduto").post(topProdutosController.create);
newRouter.route("/api/v1/topproduto/:id").put(topProdutosController.update);
newRouter.route("/api/v1/topproduto/:id").delete(topProdutosController.delete);

export default newRouter;
