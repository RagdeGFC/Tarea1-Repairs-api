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
exports.CredentialService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const user_service_1 = require("./user.service");
const credentialStorage_model_1 = require("../../../data/postgres/models/credentialStorage.model");
const postgres_database_1 = require("../../../data/postgres/postgres-database");
const securityBox_model_1 = require("../../../data/postgres/models/securityBox.model");
const user_model_1 = require("../../../data/postgres/models/user.model");
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'mySecretKey123456';
const IV_LENGTH = 16;
function encrypt(text) {
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
function decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedText = Buffer.from(textParts[1], 'hex');
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
class CredentialService {
    static getCredentials(userId, pin) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentialRepository = postgres_database_1.AppDataSource.getRepository(credentialStorage_model_1.CredentialStorage);
            const isValidPin = yield user_service_1.UserService.validateSecurityPin(userId, pin);
            if (!isValidPin)
                throw new Error('PIN de seguridad incorrecto');
            const credentials = yield credentialRepository.find({
                where: { securityBox: { user: { id: userId } } },
            });
            return credentials.map((cred) => (Object.assign(Object.assign({}, cred), { password: decrypt(cred.password) })));
        });
    }
    static addCredential(userId, securityBoxId, account, password, description, code_1, code_2) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = postgres_database_1.AppDataSource.getRepository(user_model_1.User);
            const securityBoxRepository = postgres_database_1.AppDataSource.getRepository(securityBox_model_1.SecurityBox);
            const credentialRepository = postgres_database_1.AppDataSource.getRepository(credentialStorage_model_1.CredentialStorage);
            const user = yield userRepository.findOne({ where: { id: userId } });
            if (!user)
                throw new Error('Usuario no encontrado');
            const securityBox = yield securityBoxRepository.findOne({
                where: { id: securityBoxId, user: { id: userId } },
            });
            if (!securityBox)
                throw new Error('Security Box no encontrada');
            const encryptedPassword = encrypt(password);
            const newCredential = credentialRepository.create({
                account,
                password: encryptedPassword,
                description,
                code_1,
                code_2,
                securityBox,
            });
            yield credentialRepository.save(newCredential);
            return newCredential;
        });
    }
    static updateCredential(userId, credentialId, pin, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentialRepository = postgres_database_1.AppDataSource.getRepository(credentialStorage_model_1.CredentialStorage);
            const isValidPin = yield user_service_1.UserService.validateSecurityPin(userId, pin);
            if (!isValidPin)
                throw new Error('PIN de seguridad incorrecto');
            const credential = yield credentialRepository.findOne({
                where: { id: credentialId, securityBox: { user: { id: userId } } },
            });
            if (!credential)
                throw new Error('Credencial no encontrada');
            if (newData.service)
                credential.service = newData.service;
            if (newData.username)
                credential.username = newData.username;
            if (newData.password)
                credential.password = encrypt(newData.password);
            yield credentialRepository.save(credential);
            return { message: 'Credencial actualizada con éxito' };
        });
    }
    static deleteCredential(userId, credentialId, pin) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentialRepository = postgres_database_1.AppDataSource.getRepository(credentialStorage_model_1.CredentialStorage);
            const isValidPin = yield user_service_1.UserService.validateSecurityPin(userId, pin);
            if (!isValidPin)
                throw new Error('PIN de seguridad incorrecto');
            const credential = yield credentialRepository.findOne({
                where: { id: credentialId, securityBox: { user: { id: userId } } },
            });
            if (!credential)
                throw new Error('Credencial no encontrada');
            yield credentialRepository.remove(credential);
            return { message: 'Credencial eliminada con éxito' };
        });
    }
}
exports.CredentialService = CredentialService;
