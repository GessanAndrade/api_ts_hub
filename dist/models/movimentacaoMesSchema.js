"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const movimentacaoMesSchema = new mongoose.Schema({
    dateMov: { type: Date },
    vendas: { type: Number },
});
exports.default = movimentacaoMesSchema;
