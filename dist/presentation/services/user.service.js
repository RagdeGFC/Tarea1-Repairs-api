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
exports.UserService = void 0;
const bcrypt_adapter_1 = require("../../config/bcrypt.adapter");
const jwt_adapter_1 = require("../../config/jwt.adapter");
const user_model_1 = require("../../data/postgres/models/user.model");
const services_1 = require("../../domain/services");
class UserService {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({
                where: {
                    status: user_model_1.Status.AVAILABLE,
                    id: id,
                },
            });
            if (!user) {
                throw services_1.CustomError.notFound('User not found');
            }
            return user;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.User.find({
                    where: {
                        status: user_model_1.Status.AVAILABLE,
                    },
                });
                return users;
            }
            catch (error) {
                throw services_1.CustomError.internalServer('Error fetching users');
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.User();
            user.name = data.name;
            user.email = data.email;
            user.password = data.password;
            user.role = data.role;
            try {
                const newUser = yield user.save();
                return {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                };
            }
            catch (error) {
                console.error(error);
                throw services_1.CustomError.internalServer('Error creating user.');
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne(id);
            user.name = data.name;
            user.email = data.email;
            try {
                yield user.save();
                return {
                    message: 'User updated',
                };
            }
            catch (error) {
                throw services_1.CustomError.internalServer('Error updating user');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne(id);
            user.status = user_model_1.Status.DISABLE;
            try {
                yield user.save();
                return { ok: true };
            }
            catch (error) {
                throw services_1.CustomError.internalServer('Error deleting user');
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserByEmail(email);
            const isMatching = yield bcrypt_adapter_1.bcryptAdapter.compare(password, user.password);
            if (!isMatching)
                throw services_1.CustomError.unAuthorized('Invalid credentials');
            const token = yield jwt_adapter_1.JwtAdapter.generateToken({ id: user.id });
            if (!token)
                throw services_1.CustomError.internalServer('Error generating token');
            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            };
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({
                where: {
                    email,
                    status: user_model_1.Status.AVAILABLE,
                },
            });
            if (!user) {
                throw services_1.CustomError.notFound('User not found');
            }
            return user;
        });
    }
}
exports.UserService = UserService;
