"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pedidoVendaService_1 = require("../services/pedidoVendaService");
const HttpStatus = require("http-status");
const redis_1 = require("../infra/redis");
const helper_1 = require("../infra/helper");
class PedidoVendaController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cacheKey = "pedidoVenda";
                const cached = yield redis_1.default.get(cacheKey);
                if (cached) {
                    console.log("Resposta vinda do Redis");
                    return helper_1.default.sendResponse(res, HttpStatus.status.OK, JSON.parse(cached));
                }
                console.log("Resposta vinda do banco");
                const response = yield pedidoVendaService_1.default.get();
                yield redis_1.default.set(cacheKey, JSON.stringify(response), 20);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, response);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao buscar pedidos" });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const term = req.params.term;
                const page = (req.param('page')) ? parseInt(req.param('page')) : 1;
                const perPage = (req.param('limit')) ? parseInt(req.param('limit')) : 1;
                const response = yield pedidoVendaService_1.default.search(term, page, perPage);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, response);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao buscar pedido" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const response = yield pedidoVendaService_1.default.getByID(id);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, response);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao buscar pedido" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vm = req.body;
                yield pedidoVendaService_1.default.create(vm);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, "pedido cadastrada com sucesso!");
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao criar pedido" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const news = req.body;
                yield pedidoVendaService_1.default.update(id, news);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, "pedido atualizada com sucesso!");
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao atualizar pedido" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield pedidoVendaService_1.default.delete(id);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, "pedido deletada com sucesso!");
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao deletar pedido" });
            }
        });
    }
}
exports.default = new PedidoVendaController();
