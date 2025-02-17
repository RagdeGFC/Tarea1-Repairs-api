"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./passwordManager/routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const router = (0, express_1.Router)();
router.use('/api/auth', auth_routes_1.default);
router.use('/api/user', user_routes_1.default);
console.log('📌 Rutas registradas en routes.ts:');
router.stack.forEach((r) => { var _a; return console.log(((_a = r.route) === null || _a === void 0 ? void 0 : _a.path) || 'Middleware sin ruta'); });
exports.default = router;
