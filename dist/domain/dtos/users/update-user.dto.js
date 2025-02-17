"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDTO = void 0;
const config_1 = require("../../../config");
class UpdateUserDTO {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    static create(object) {
        const { name, email } = object;
        if (!name)
            return ['Name is required'];
        if (!email)
            return ['Email is required'];
        if (!config_1.regularExp.email.test(email))
            return ['Invalid email'];
        return [undefined, new UpdateUserDTO(name, email)];
    }
}
exports.UpdateUserDTO = UpdateUserDTO;
