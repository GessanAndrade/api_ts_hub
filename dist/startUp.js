"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db_1 = require("./infra/db");
const auth_1 = require("./infra/auth");
const uploads_1 = require("./infra/uploads");
const movimentacaoMesRouter_1 = require("./router/movimentacaoMesRouter");
const pedidoVendaRouter_1 = require("./router/pedidoVendaRouter");
const topProdutosRouter_1 = require("./router/topProdutosRouter");
class StartUp {
    constructor() {
        console.log("Constructor");
        this.app = express();
        this._db = new db_1.default();
        this._db.createConnection();
        this.middler();
        this.routes();
    }
    enableCors() {
        const options = {
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
        this.app.route("/uploads").post(uploads_1.default.single("file"), (req, res) => {
            try {
                res.send("arquivo enviado com sucesso.");
            }
            catch (error) {
                console.log(error);
            }
        });
        //A rota principal vai deixar passsar, acima, as demais rotas precisarão de autorização.
        this.app.use(auth_1.default.validate);
        //movimentacação mês
        this.app.use("/", movimentacaoMesRouter_1.default);
        //pedido venda
        this.app.use("/", pedidoVendaRouter_1.default);
        //top produtos
        this.app.use("/", topProdutosRouter_1.default);
    }
}
exports.default = new StartUp();
