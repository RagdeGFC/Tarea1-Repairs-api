"use strict";
// import { Router } from 'express';
// import { AuthController } from '../controllers/auth.controller';
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// const controller = new AuthController();
// Definir las rutas de autenticación
// router.post('/login', (req, res) => controller.login(req, res));
// router.post('/register', (req, res) => controller.register(req, res));
// console.log('📌 Rutas en auth.routes.ts registradas:');
// router.stack.forEach((r) =>
// 	console.log(r.route?.path || 'Middleware sin ruta'),
// );
// Exportar correctamente el router
// export default router;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRoutes = (0, express_1.Router)(); //  Renombramos `router` a `authRoutes`
const controller = new auth_controller_1.AuthController();
// ✅ Definir rutas correctamente
authRoutes.post('/login', (req, res) => controller.login(req, res));
authRoutes.post('/register', (req, res) => controller.register(req, res));
// ✅ Exportar correctamente `authRoutes`
exports.default = authRoutes;
