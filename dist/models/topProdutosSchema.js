"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const topProdutosSchema = new mongoose.Schema({
    produto: { type: String },
    quantidade: { type: Number },
});
exports.default = topProdutosSchema;
