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
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Aquí irá la lógica para autenticar al usuario
                return res.status(200).json({ message: 'Login exitoso' });
            }
            catch (error) {
                return res.status(500).json({ message: 'Error en login' });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Aquí irá la lógica para registrar un usuario
                return res
                    .status(201)
                    .json({ message: 'Usuario registrado exitosamente' });
            }
            catch (error) {
                return res.status(500).json({ message: 'Error en registro' });
            }
        });
    }
}
exports.AuthController = AuthController;
