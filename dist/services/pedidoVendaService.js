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
const pedidoVendaRepository_1 = require("../repository/pedidoVendaRepository");
class PedidoVendaService {
    //funciona como uma especie de like
    search(term, page, perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pedidoVendaRepository_1.default.find({ 'title': new RegExp('.*' + term + '*.', 'i') })
                //paginação
                .skip((page - 1) * perPage)
                .limit(perPage);
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pedidoVendaRepository_1.default.find({});
        });
    }
    getByID(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pedidoVendaRepository_1.default.findById(_id);
        });
    }
    create(pedido) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pedidoVendaRepository_1.default.create(pedido);
        });
    }
    update(_id, pedido) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pedidoVendaRepository_1.default.findByIdAndUpdate(_id, pedido);
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pedidoVendaRepository_1.default.findByIdAndDelete(_id);
        });
    }
}
exports.default = new PedidoVendaService();
