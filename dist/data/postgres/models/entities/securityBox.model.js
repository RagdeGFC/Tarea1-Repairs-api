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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityBox = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const credentialStorage_model_1 = require("./credentialStorage.model");
let SecurityBox = class SecurityBox {
};
exports.SecurityBox = SecurityBox;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SecurityBox.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], SecurityBox.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SecurityBox.prototype, "favorite", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], SecurityBox.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], SecurityBox.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.securityBoxes),
    __metadata("design:type", User_1.User)
], SecurityBox.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => credentialStorage_model_1.CredentialStorage, (credential) => credential.securityBox),
    __metadata("design:type", Array)
], SecurityBox.prototype, "credentials", void 0);
exports.SecurityBox = SecurityBox = __decorate([
    (0, typeorm_1.Entity)('security_box')
], SecurityBox);
