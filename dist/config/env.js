"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    PASSWORD_DATABASE: (0, env_var_1.get)('PASSWORD_DATABASE').required().asString(),
    USERNAME_DATABASE: (0, env_var_1.get)('USERNAME_DATABASE').required().asString(),
    DATABASE: (0, env_var_1.get)('DATABASE').required().asString(),
    PORT_DATABASE: (0, env_var_1.get)('PORT_DATABASE').required().asPortNumber(),
    HOST_DATABASE: (0, env_var_1.get)('HOST_DATABASE').required().asString(),
    JWT_SECRET: (0, env_var_1.get)('JWT_SECRET').required().asString(),
    JWT_EXPIRES_IN: (0, env_var_1.get)('JWT_EXPIRES_IN').required().asString(),
};
