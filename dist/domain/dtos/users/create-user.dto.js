"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDTO = void 0;
const config_1 = require("../../../config");
class CreateUserDTO {
    constructor(name, email, password, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    static create(object) {
        const { name, email, password, role } = object;
        if (!name)
            return ['Name is required'];
        if (!email)
            return ['Email is required'];
        if (!config_1.regularExp.email.test(email))
            return ['Invalid email'];
        if (!password)
            return ['Password is required'];
        if (!config_1.regularExp.password.test(password))
            return [
                'The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.',
            ];
        if (!role)
            return ['Missing role'];
        return [undefined, new CreateUserDTO(name, email, password, role)];
    }
}
exports.CreateUserDTO = CreateUserDTO;
