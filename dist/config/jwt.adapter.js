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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./env");
class JwtAdapter {
    static generateToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const secret = env_1.envs.JWT_SECRET;
                if (!secret) {
                    reject(new Error('JWT_SECRET is not defined'));
                    return;
                }
                // ✅ Convertimos `expiresIn` a `number` si es un número, o usamos `undefined`
                let expiresIn;
                if (!isNaN(Number(env_1.envs.JWT_EXPIRES_IN))) {
                    expiresIn = Number(env_1.envs.JWT_EXPIRES_IN); // Si es un número, lo usamos
                }
                else {
                    expiresIn = undefined; // Evitamos valores inválidos
                }
                // ✅ `expiresIn` siempre tendrá el tipo correcto
                const options = { expiresIn };
                jsonwebtoken_1.default.sign(payload, secret, options, (err, token) => {
                    if (err || !token) {
                        reject(err || new Error('Token generation failed'));
                    }
                    else {
                        resolve(token);
                    }
                });
            });
        });
    }
    static verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const secret = env_1.envs.JWT_SECRET;
                if (!secret) {
                    reject(new Error('JWT_SECRET is not defined'));
                    return;
                }
                jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(decoded || null);
                    }
                });
            });
        });
    }
}
exports.JwtAdapter = JwtAdapter;
