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
exports.SecurityBoxService = void 0;
const securityBox_model_1 = require("../../../data/postgres/models/securityBox.model");
const user_model_1 = require("../../../data/postgres/models/user.model");
const postgres_database_1 = require("../../../data/postgres/postgres-database");
class SecurityBoxService {
    static createSecurityBox(userId, name, favorite, icon) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = postgres_database_1.AppDataSource.getRepository(user_model_1.User);
            const securityBoxRepository = postgres_database_1.AppDataSource.getRepository(securityBox_model_1.SecurityBox);
            const user = yield userRepository.findOne({ where: { id: userId } });
            if (!user)
                throw new Error('Usuario no encontrado');
            const newSecurityBox = securityBoxRepository.create({
                name,
                favorite,
                icon,
                user,
            });
            yield securityBoxRepository.save(newSecurityBox);
            return newSecurityBox;
        });
    }
    static getSecurityBoxes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const securityBoxRepository = postgres_database_1.AppDataSource.getRepository(securityBox_model_1.SecurityBox);
            return yield securityBoxRepository.find({
                where: { user: { id: userId } },
            });
        });
    }
    // Endpoint #3 Listar Categorías
    static getCategories(sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = postgres_database_1.AppDataSource.getRepository(securityBox_model_1.SecurityBox);
            let orderBy = {};
            if (sort === 'alphabetical') {
                orderBy = { name: 'ASC' };
            }
            const categories = yield repository.find({ order: orderBy });
            return categories.map((cat) => ({
                id: cat.id,
                name: cat.name,
                favorite: cat.favorite || false,
            }));
        });
    }
}
exports.SecurityBoxService = SecurityBoxService;
