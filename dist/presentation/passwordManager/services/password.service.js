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
exports.PasswordService = void 0;
const password_model_1 = require("../../../data/postgres/models/password.model");
const user_model_1 = require("../../../data/postgres/models/user.model");
const postgres_database_1 = require("../../../data/postgres/postgres-database");
const encryption_1 = require("../utils/encryption");
class PasswordService {
    static savePassword(userId, service, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordRepository = postgres_database_1.AppDataSource.getRepository(password_model_1.Password);
            const userRepository = postgres_database_1.AppDataSource.getRepository(user_model_1.User);
            const user = yield userRepository.findOne({
                where: { id: userId.toString() },
            });
            if (!user)
                throw new Error('Usuario no encontrado');
            const newPassword = new password_model_1.Password();
            newPassword.user = user;
            newPassword.service = service;
            newPassword.encryptedPassword = (0, encryption_1.encryptPassword)(password);
            yield passwordRepository.save(newPassword);
            return { message: 'Contraseña guardada exitosamente' };
        });
    }
    static getPasswords(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordRepository = postgres_database_1.AppDataSource.getRepository(password_model_1.Password);
            const passwords = yield passwordRepository.find({
                where: { user: { id: userId.toString() } },
            });
            return passwords.map((pwd) => ({
                service: pwd.service,
                password: (0, encryption_1.decryptPassword)(pwd.encryptedPassword),
            }));
        });
    }
}
exports.PasswordService = PasswordService;
