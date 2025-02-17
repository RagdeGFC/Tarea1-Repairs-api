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
exports.UserController = void 0;
const services_1 = require("../../domain/services");
const create_user_dto_1 = require("../../domain/dtos/users/create-user.dto");
const update_user_dto_1 = require("../../domain/dtos/users/update-user.dto");
const validate_owner_1 = require("../../config/validate-owner");
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.handleError = (error, res) => {
            if (error instanceof services_1.CustomError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.error(error);
            return res.status(500).json({ message: 'Something went very wrong!! ❌' });
        };
        this.findAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.userService
                .findAll()
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        });
        this.findOneUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            this.userService
                .findOne(id)
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createUserDto] = create_user_dto_1.CreateUserDTO.create(req.body);
            if (error) {
                return res.status(422).json({ message: error });
            }
            this.userService
                .create(createUserDto)
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sessionUserId = req.body.sessionUser.id;
            if (!(0, validate_owner_1.protectAccountOwner)(id, sessionUserId)) {
                return res
                    .status(401)
                    .json({ message: 'You are not the owner of this account' });
            }
            const [error, updateUserDto] = update_user_dto_1.UpdateUserDTO.create(req.body);
            if (error) {
                return res.status(422).json({ message: error });
            }
            this.userService
                .update(id, updateUserDto)
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sessionUserId = req.body.sessionUser.id;
            if (!(0, validate_owner_1.protectAccountOwner)(id, sessionUserId)) {
                return res
                    .status(401)
                    .json({ message: 'You are not the owner of this account' });
            }
            this.userService
                .delete(id)
                .then((data) => res.status(204).json(data))
                .catch((error) => this.handleError(error, res));
        });
        this.loginUser = (req, res) => {
            const { email, password } = req.body;
            this.userService
                .login(email, password)
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        };
    }
}
exports.UserController = UserController;
