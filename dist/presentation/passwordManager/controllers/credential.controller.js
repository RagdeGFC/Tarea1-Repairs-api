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
exports.CredentialController = void 0;
const credential_service_1 = require("../services/credential.service");
// import { Pin } from '../../data/postgres/models/pin/pin.model';
require("../../types/express");
//... resto del código...
class CredentialController {
    static addCredential(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, securityBoxId, account, password, description, code_1, code_2, } = req.body;
                const newCredential = yield credential_service_1.CredentialService.addCredential(userId, securityBoxId, account, password, description, code_1, code_2);
                res.status(201).json(newCredential);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static getCredentials(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const additionalParam = req.query.additionalParam || req.body.additionalParam;
                const credentials = yield credential_service_1.CredentialService.getCredentials(userId, additionalParam);
                res.status(200).json(credentials);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    static updateCredential(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const { credentialId, pin, newData } = req.body;
                if (!credentialId || !pin || !newData) {
                    res.status(400).json({ message: 'Faltan datos requeridos' });
                    return;
                }
                const response = yield credential_service_1.CredentialService.updateCredential(userId, credentialId, pin, newData);
                res.status(200).json(response);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    static deleteCredential(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const { credentialId, pin } = req.body;
                if (!credentialId || !pin) {
                    res.status(400).json({ message: 'Faltan datos requeridos' });
                    return;
                }
                const response = yield credential_service_1.CredentialService.deleteCredential(userId, credentialId, pin);
                res.status(200).json(response);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.CredentialController = CredentialController;
