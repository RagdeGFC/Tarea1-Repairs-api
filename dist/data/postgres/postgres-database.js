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
exports.PostgresDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
console.log('🔹 USERNAME_DATABASE:', process.env.USERNAME_DATABASE);
console.log('🔹 PASSWORD_DATABASE:', process.env.PASSWORD_DATABASE);
console.log('🔹 DATABASE_URL:', process.env.DATABASE_URL);
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    username: process.env.USERNAME_DATABASE,
    password: String(process.env.PASSWORD_DATABASE).trim(), // Convertimos a string y eliminamos espacios
    entities: ['src/data/postgres/models/**/*.ts'],
    synchronize: false, // desactivar sincronizacion porque ya tenemos datos
    logging: false,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
class PostgresDatabase {
    constructor() {
        this.datasource = exports.AppDataSource;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.datasource.initialize();
                console.log('✅ Database connected successfully!');
            }
            catch (error) {
                console.error('❌ Database connection failed:', error);
            }
        });
    }
}
exports.PostgresDatabase = PostgresDatabase;
