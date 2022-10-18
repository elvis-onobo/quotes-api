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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../config/db"));
class AuthService {
    /**
     * Sign up user
     * @param payload
     * @returns
     */
    static signup(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = process.env.SALT_ROUNDS;
            if (saltRounds == null || saltRounds == undefined) {
                throw new http_errors_1.InternalServerError();
            }
            const hash = yield bcrypt_1.default.hash(payload.password, Number(saltRounds));
            payload.password = hash;
            yield db_1.default.create(payload);
            return true;
        });
    }
    /**
     * Login user
     * @param payload
     * @returns
     */
    static login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield db_1.default.findOneByEmail(payload.email);
            let passwordIsCorrect = yield bcrypt_1.default.compare(payload.password, userData.password);
            if (!passwordIsCorrect) {
                throw new http_errors_1.BadRequest('Incorrect password');
            }
            const token = jsonwebtoken_1.default.sign(userData, process.env.APP_KEY);
            return {
                user: userData,
                token,
            };
        });
    }
}
exports.default = AuthService;
