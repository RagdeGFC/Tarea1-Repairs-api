"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialStorage = void 0;
const typeorm_1 = require("typeorm");
const securityBox_model_1 = require("./securityBox.model");
const pin_model_1 = __importDefault(require("../pin/pin.model"));
let CredentialStorage = class CredentialStorage {
};
exports.CredentialStorage = CredentialStorage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CredentialStorage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], CredentialStorage.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], CredentialStorage.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], CredentialStorage.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], CredentialStorage.prototype, "code_1", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], CredentialStorage.prototype, "code_2", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], CredentialStorage.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], CredentialStorage.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => securityBox_model_1.SecurityBox, (securityBox) => securityBox.credentials),
    __metadata("design:type", securityBox_model_1.SecurityBox)
], CredentialStorage.prototype, "securityBox", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pin_model_1.default, (pin) => pin.credentials),
    __metadata("design:type", pin_model_1.default)
], CredentialStorage.prototype, "pin", void 0);
exports.CredentialStorage = CredentialStorage = __decorate([
    (0, typeorm_1.Entity)('credential_storage')
], CredentialStorage);
