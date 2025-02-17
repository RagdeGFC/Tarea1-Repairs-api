"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regularExp = void 0;
exports.regularExp = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?=.*[a-zA-Z]).{10,16}$/,
};
