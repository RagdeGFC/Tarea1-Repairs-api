"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes")); //
const user_routes_1 = __importDefault(require("../passwordManager/routes/user.routes")); //
const securityBox_routes_1 = __importDefault(require("../passwordManager/routes/securityBox.routes")); // Endpoint #3 Listar Categorías
// const securityBoxRoutes = require('../passwordManager/routes/securityBox.routes').default; // 🚀 Probar `require` ----no funcionó
//bandera
console.log('📌 Verificando importación de securityBoxRoutes en index.ts...');
console.log('🔍 securityBoxRoutes:', securityBox_routes_1.default); // 🔍 Verifica si es `undefined`
//bandera
if (!securityBox_routes_1.default)
    console.error('❌ ERROR: securityBoxRoutes no está definido.');
else
    console.log('✅ securityBoxRoutes cargado correctamente.');
const router = (0, express_1.Router)();
// ✅ Registrar rutas correctamente
router.use('/api/auth', auth_routes_1.default);
router.use('/api/user', user_routes_1.default);
router.use('/api/security_box', securityBox_routes_1.default); //  Endpoint #3 Listar Categorías
//bandera
console.log('📌 Rutas registradas en Express después de securityBoxRoutes:');
router.stack.forEach((r) => { var _a; return console.log(((_a = r.route) === null || _a === void 0 ? void 0 : _a.path) || 'Middleware sin ruta'); });
// ✅ Exportar el router
exports.default = router;
