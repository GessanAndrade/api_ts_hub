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
const topProdutosRepository_1 = require("../repository/topProdutosRepository");
class TopProdutosService {
    //funciona como uma especie de like
    search(term, page, perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield topProdutosRepository_1.default.find({ 'title': new RegExp('.*' + term + '*.', 'i') })
                //paginação
                .skip((page - 1) * perPage)
                .limit(perPage);
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield topProdutosRepository_1.default.find({});
            //se quiser buscar informações mais especificas, use o exemplo abaixo:
            //return await TopProdutosRepository.find({ 'active' : true });
            //active é o nome de um dos campos
            //nesse caso, você pode restringir os campos que irão aparecer
            //return await TopProdutosRepository.find({ 'active' : true }, 'title hat img');
            //ordenar por data, do mais novo
            //return await TopProdutosRepository.find({ 'active' : true }, 'title hat img publishDate').sort( publishDate: -1 );
            //limitar quantidade de registros
            //return await TopProdutosRepository.find({ 'active' : true }, 'title hat img publishDate').sort( publishDate: -1 ).limit(2);
            //se quiser buscar informações entre duas datas
            //let startDate = new Date("2019-01-01T00:00:00:000Z");
            //let endDate = new Date("2019-03-01T00:00:00:000Z");
            //return await TopProdutosRepository.find({ 'publishDate' : { $gt: startDate, $lt: endDate } });
        });
    }
    getByID(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield topProdutosRepository_1.default.findById(_id);
        });
    }
    create(news) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield topProdutosRepository_1.default.create(news);
        });
    }
    update(_id, news) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield topProdutosRepository_1.default.findByIdAndUpdate(_id, news);
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield topProdutosRepository_1.default.findByIdAndDelete(_id);
        });
    }
}
exports.default = new TopProdutosService();
