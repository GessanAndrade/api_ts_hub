"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const movimentacaoMesSchema_1 = require("../models/movimentacaoMesSchema");
//Ele irá criar no mongodb uma colection e vai alimentar com os dados de NewsSchema
exports.default = mongoose.model("t_movimentacoes", movimentacaoMesSchema_1.default);
