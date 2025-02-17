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
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAll();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener usuarios' });
            }
        });
    }
    findOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.findById(req.params.id);
                if (!user)
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                res.json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al buscar usuario' });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('📌 createUser() fue llamado con datos:', req.body); // Agregar log
                const newUser = yield this.userService.create(req.body);
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear usuario' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield this.userService.update(req.params.id, req.body);
                res.json(updatedUser);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar usuario' });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.delete(req.params.id);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar usuario' });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.login(req.body);
                if (!user)
                    return res.status(401).json({ message: 'Credenciales incorrectas' });
                res.json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al iniciar sesión' });
            }
        });
    }
}
exports.UserController = UserController;
