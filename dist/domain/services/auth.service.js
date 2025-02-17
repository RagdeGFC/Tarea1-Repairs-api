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
exports.AuthService = void 0;
const user_model_1 = require("../../data/postgres/models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
class AuthService {
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOneBy({ email });
            if (!user)
                throw new Error('User not found');
            const isValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isValid)
                throw new Error('Invalid credentials');
            // Verifica que el secreto JWT esté definido y sea del tipo correcto
            const secret = env_1.envs.JWT_SECRET;
            if (!secret)
                throw new Error('JWT_SECRET is not defined');
            // Asegurar que `JWT_EXPIRES_IN` sea un número o string válido
            const expiresIn = isNaN(Number(env_1.envs.JWT_EXPIRES_IN))
                ? undefined
                : Number(env_1.envs.JWT_EXPIRES_IN);
            // Definir opciones para `jwt.sign`
            const options = expiresIn ? { expiresIn } : {};
            // Generación del token
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret, options);
            return token;
        });
    }
}
exports.AuthService = AuthService;
