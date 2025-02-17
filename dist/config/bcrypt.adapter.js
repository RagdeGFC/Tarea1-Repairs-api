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
exports.bcryptAdapter = void 0;
const bcrypt_1 = require("bcrypt");
exports.bcryptAdapter = {
    encrypt: (text) => __awaiter(void 0, void 0, void 0, function* () {
        const salt = (0, bcrypt_1.genSaltSync)(10);
        return (0, bcrypt_1.hashSync)(text, salt);
    }),
    compare: (text, hash) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, bcrypt_1.compareSync)(text, hash);
    }),
};
