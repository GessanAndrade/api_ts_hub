import express = require("express");
import cors = require("cors");
import * as bodyParser from "body-parser";

import DataBase from "./infra/db";
import Auth from "./infra/auth";
import uploads from "./infra/uploads";
import movimentacaoMesRouter from "./router/movimentacaoMesRouter";
import pedidoVendaRouter from "./router/pedidoVendaRouter";
import topProdutosRouter from "./router/topProdutosRouter";

class StartUp {
  public app: express.Application;
  private _db: DataBase;

  constructor() {
    console.log("Constructor");
    this.app = express();

    this._db = new DataBase();
    this._db.createConnection();
    this.middler();
    this.routes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: "GET,OPTIONS,PUT,POST,DELETE",
      //Tome muito cuidado com isso, * libera para acesso de todos.
      origin: "*",
    };
    this.app.use(cors(options));
  }

  middler() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    this.app.route("/").get((req, res) => {
      res.send({ versao: "0.0.1" });
    });

    this.app.route("/uploads").post(uploads.single("file"), (req, res) => {
      try {
        res.send("arquivo enviado com sucesso.");
      } catch (error) {
        console.log(error);
      }
    });

    //A rota principal vai deixar passsar, acima, as demais rotas precisarão de autorização.
    this.app.use(Auth.validate);

    //movimentacação mês
    this.app.use("/", movimentacaoMesRouter);
    //pedido venda
    this.app.use("/", pedidoVendaRouter);
    //top produtos
    this.app.use("/", topProdutosRouter);
  }
}

export default new StartUp();
