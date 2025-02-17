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
const credential_controller_1 = require("../controllers/credential.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/', (req, res, next) => {
    auth_middleware_1.AuthMiddleware.protect(req, res, next);
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield credential_controller_1.CredentialController.addCredential(req, res);
}));
router.post('/get', (req, res, next) => {
    auth_middleware_1.AuthMiddleware.protect(req, res, next);
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield credential_controller_1.CredentialController.getCredentials(req, res);
}));
router.put('/update', (req, res, next) => {
    auth_middleware_1.AuthMiddleware.protect(req, res, next);
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield credential_controller_1.CredentialController.updateCredential(req, res);
}));
router.delete('/delete', (req, res, next) => {
    auth_middleware_1.AuthMiddleware.protect(req, res, next);
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield credential_controller_1.CredentialController.deleteCredential(req, res);
}));
exports.default = router;
