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
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, surname, email, cellphone, password } = req.body;
                const user = yield auth_service_1.AuthService.register(name, surname, email, cellphone, password);
                return res.status(201).json(user);
            }
            catch (error) {
                console.error('Error en register:', error);
                return res.status(400).json({
                    message: error instanceof Error ? error.message : 'Error desconocido',
                });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const data = yield auth_service_1.AuthService.login(email, password);
                return res.status(200).json(data);
            }
            catch (error) {
                console.error('Error en login:', error);
                return res.status(400).json({
                    message: error instanceof Error ? error.message : 'Error desconocido',
                });
            }
        });
    }
}
exports.AuthController = AuthController;
