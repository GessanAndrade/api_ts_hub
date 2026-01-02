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
const movimentacaoMesService_1 = require("../services/movimentacaoMesService");
const HttpStatus = require("http-status");
const redis_1 = require("../infra/redis");
const helper_1 = require("../infra/helper");
class MovimentacaoMesController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cacheKey = "movimentacaoMes";
                const cached = yield redis_1.default.get(cacheKey);
                if (cached) {
                    console.log("Resposta vinda do Redis");
                    return helper_1.default.sendResponse(res, HttpStatus.status.OK, JSON.parse(cached));
                }
                console.log("Resposta vinda do banco");
                const response = yield movimentacaoMesService_1.default.get();
                yield redis_1.default.set(cacheKey, JSON.stringify(response), 20);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, response);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao buscar movimentação" });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const term = req.params.term;
                const page = (req.param('page')) ? parseInt(req.param('page')) : 1;
                const perPage = (req.param('limit')) ? parseInt(req.param('limit')) : 1;
                const response = yield movimentacaoMesService_1.default.search(term, page, perPage);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, response);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao buscar movimentação" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const response = yield movimentacaoMesService_1.default.getByID(id);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, response);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao buscar movimentação" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vm = req.body;
                yield movimentacaoMesService_1.default.create(vm);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, "movimentação cadastrada com sucesso!");
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao criar movimentação" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const news = req.body;
                yield movimentacaoMesService_1.default.update(id, news);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, "movimentação atualizada com sucesso!");
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao atualizar movimentação" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield movimentacaoMesService_1.default.delete(id);
                return helper_1.default.sendResponse(res, HttpStatus.status.OK, "movimentação deletada com sucesso!");
            }
            catch (error) {
                console.error(error);
                return res
                    .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erro ao deletar movimentação" });
            }
        });
    }
}
exports.default = new MovimentacaoMesController();
