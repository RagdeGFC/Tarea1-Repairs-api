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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const postgres_database_1 = require("../../../data/postgres/postgres-database");
const user_model_1 = require("../../../data/postgres/models/user.model");
dotenv_1.default.config();
const userRepository = postgres_database_1.AppDataSource.getRepository(user_model_1.User);
class AuthService {
    static register(name, surname, email, cellphone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield userRepository.findOne({ where: { email } });
            if (existingUser)
                throw new Error('El usuario ya existe');
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = userRepository.create({
                name,
                surname,
                email,
                cellphone,
                password: hashedPassword,
            });
            yield userRepository.save(newUser);
            return newUser;
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findOne({ where: { email } });
            if (!user)
                throw new Error('Credenciales incorrectas');
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error('Credenciales incorrectas');
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token, user };
        });
    }
}
exports.AuthService = AuthService;
