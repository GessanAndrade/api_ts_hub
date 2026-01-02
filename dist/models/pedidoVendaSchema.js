"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const pedidoVendaSchema = new mongoose.Schema({
    numPedido: { type: Number },
    status: { type: String },
    valor: { type: Number },
});
exports.default = pedidoVendaSchema;
