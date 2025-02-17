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
const express_1 = require("express");
const securityBox_controller_1 = require("../controllers/securityBox.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
//
router.post('/', (req, res, next) => {
    auth_middleware_1.AuthMiddleware.protect(req, res, next);
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield securityBox_controller_1.SecurityBoxController.createSecurityBox(req, res);
}));
//
router.get('/', (req, res, next) => {
    auth_middleware_1.AuthMiddleware.protect(req, res, next);
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield securityBox_controller_1.SecurityBoxController.getSecurityBoxes(req, res);
}));
// Endpoint #3 Listar Categorías
// router.get('/categories', SecurityBoxController.getCategories);
router.get('/categories', (req, res, next) => {
    auth_middleware_1.AuthMiddleware.protect(req, res, next);
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield securityBox_controller_1.SecurityBoxController.getCategories(req, res);
}));
console.log('📌 securityBox.routes.ts se ha cargado correctamente en el servidor.');
exports.default = router;
// module.exports = router;
