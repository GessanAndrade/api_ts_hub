"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const topProdutosSchema_1 = require("../models/topProdutosSchema");
//Ele irá criar no mongodb uma colection e vai alimentar com os dados de NewsSchema
exports.default = mongoose.model("t_topProdutos", topProdutosSchema_1.default);
