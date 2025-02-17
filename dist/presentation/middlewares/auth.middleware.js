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
exports.AuthMiddleware = void 0;
const user_model_1 = require("../../data/postgres/models/user.model");
const jwt_adapter_1 = require("../../config/jwt.adapter");
class AuthMiddleware {
    static protect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.header('Authorization');
            if (!authorization || !authorization.startsWith('Bearer ')) {
                return res
                    .status(401)
                    .json({ message: 'Token no válido, inicia sesión' });
            }
            const token = authorization.split(' ')[1];
            try {
                const payload = (yield jwt_adapter_1.JwtAdapter.verifyToken(token));
                if (!payload)
                    return res.status(401).json({ message: 'Token inválido' });
                const user = yield user_model_1.User.findOne({ where: { id: payload.id } });
                if (!user)
                    return res.status(401).json({ message: 'Usuario no encontrado' });
                req.body.sessionUser = user;
                next();
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: 'Error interno de autenticación' });
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
