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
exports.PasswordController = void 0;
const password_service_1 = require("../services/password.service");
class PasswordController {
    static savePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, service, password } = req.body;
                if (!userId || !service || !password) {
                    return res
                        .status(400)
                        .json({ message: 'Todos los campos son obligatorios' });
                }
                const response = yield password_service_1.PasswordService.savePassword(userId, service, password);
                return res.status(201).json(response);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    static getPasswords(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.query;
                if (!userId)
                    return res
                        .status(400)
                        .json({ message: 'El ID del usuario es obligatorio' });
                const passwords = yield password_service_1.PasswordService.getPasswords(Number(userId));
                return res.status(200).json({ passwords });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.PasswordController = PasswordController;
