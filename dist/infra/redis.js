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
const redis_1 = require("redis");
class RedisClient {
    constructor() {
        if (!process.env.REDIS_URL) {
            console.warn("REDIS_URL não definida");
        }
        this.client = (0, redis_1.createClient)({
            url: process.env.REDIS_URL
        });
        this.client.on("error", (err) => {
            console.error("Redis error:", err);
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client.isOpen) {
                yield this.client.connect();
                console.log("Redis conectado");
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            return this.client.get(key);
        });
    }
    set(key, value, ttlSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            yield this.client.set(key, value, { EX: ttlSeconds });
        });
    }
}
exports.default = new RedisClient();
