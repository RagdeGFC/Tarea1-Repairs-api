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
exports.User = exports.Status = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const securityBox_model_1 = require("./securityBox.model");
const password_model_1 = require("./password.model");
const pin_model_1 = __importDefault(require("./pin/pin.model"));
var Role;
(function (Role) {
    Role["EMPLOYEE"] = "EMPLOYEE";
    Role["CLIENT"] = "CLIENT";
})(Role || (exports.Role = Role = {}));
var Status;
(function (Status) {
    Status["AVAILABLE"] = "AVAILABLE";
    Status["DISABLE"] = "DISABLE";
})(Status || (exports.Status = Status = {}));
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: Status, default: Status.AVAILABLE }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }) //1
    ,
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }) //2
    ,
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }) //3
    ,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }) //4
    ,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }) //5
    ,
    __metadata("design:type", String)
], User.prototype, "cellphone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "recoveryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "securityPin", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: Role, default: Role.CLIENT }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => securityBox_model_1.SecurityBox, (securityBox) => securityBox.user),
    __metadata("design:type", securityBox_model_1.SecurityBox)
], User.prototype, "securityBoxes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => password_model_1.Password, (password) => password.user),
    __metadata("design:type", password_model_1.Password)
], User.prototype, "passwords", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pin_model_1.default, (pin) => pin.user),
    __metadata("design:type", pin_model_1.default)
], User.prototype, "pins", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
