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
exports.SecurityBoxController = void 0;
const securityBox_service_1 = require("../services/securityBox.service");
class SecurityBoxController {
    //
    static createSecurityBox(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const { name, favorite, icon } = req.body;
                const securityBox = yield securityBox_service_1.SecurityBoxService.createSecurityBox(userId, name, favorite, icon);
                return res.status(201).json(securityBox);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    //
    static getSecurityBoxes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const securityBoxes = yield securityBox_service_1.SecurityBoxService.getSecurityBoxes(userId);
                return res.status(200).json(securityBoxes);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    // Endpoint #3 Listar Categorías
    static getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('📌 SecurityBoxController.getCategories fue llamado'); //bandera
                const { sort } = req.query;
                const categories = yield securityBox_service_1.SecurityBoxService.getCategories(sort);
                res.json(categories);
            }
            catch (error) {
                console.error('❌ ERROR en getCategories:', error); //bandera
                res.status(500).json({ message: 'Error al obtener las categorías' });
            }
        });
    }
}
exports.SecurityBoxController = SecurityBoxController;
