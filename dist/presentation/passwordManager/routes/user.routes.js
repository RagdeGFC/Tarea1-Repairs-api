"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_service_1 = require("../services/user.service");
const router = (0, express_1.Router)();
const userService = new user_service_1.UserService();
const controller = new user_controller_1.UserController(userService);
// ✅ Definir rutas correctamente
router.post('/register', (req, res) => controller.createUser(req, res));
router.post('/login', (req, res) => controller.loginUser(req, res));
router.get('/', (req, res) => controller.findAllUsers(req, res));
router.get('/:id', (req, res) => controller.findOneUser(req, res));
router.patch('/:id', (req, res) => controller.updateUser(req, res));
router.delete('/:id', (req, res) => controller.deleteUser(req, res));
// ✅ Exportar correctamente el router
exports.default = router;
