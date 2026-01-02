"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const pedidoVendaSchema_1 = require("../models/pedidoVendaSchema");
//Ele irá criar no mongodb uma colection e vai alimentar com os dados de NewsSchema
exports.default = mongoose.model("t_pedidos", pedidoVendaSchema_1.default);
