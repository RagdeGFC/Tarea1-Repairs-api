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
exports.UserService = void 0;
const postgres_database_1 = require("../../../data/postgres/postgres-database");
const user_model_1 = require("../../../data/postgres/models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_adapter_1 = require("../../../config/jwt.adapter");
class UserService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postgres_database_1.AppDataSource.getRepository(user_model_1.User).find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postgres_database_1.AppDataSource.getRepository(user_model_1.User).findOne({ where: { id } });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postgres_database_1.AppDataSource.getRepository(user_model_1.User).save(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = postgres_database_1.AppDataSource.getRepository(user_model_1.User);
            const user = yield userRepository.findOne({ where: { id } });
            if (!user)
                throw new Error('Usuario no encontrado');
            return yield userRepository.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = postgres_database_1.AppDataSource.getRepository(user_model_1.User);
            const user = yield userRepository.findOne({ where: { id } });
            if (!user)
                throw new Error('Usuario no encontrado');
            yield userRepository.remove(user);
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield postgres_database_1.AppDataSource.getRepository(user_model_1.User).findOne({
                where: { email: credentials.email },
            });
            if (!user || !(yield bcrypt_1.default.compare(credentials.password, user.password))) {
                return null;
            }
            const token = jwt_adapter_1.JwtAdapter.generateToken({ id: user.id });
            return { user, token };
        });
    }
    static validateSecurityPin(userId, pin) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = postgres_database_1.AppDataSource.getRepository(user_model_1.User);
            const user = yield userRepository.findOne({ where: { id: userId } });
            if (!user || user.securityPin !== pin)
                return false;
            return true;
        });
    }
}
exports.UserService = UserService;
