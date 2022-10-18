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
const promises_1 = __importDefault(require("fs/promises"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_errors_1 = require("http-errors");
const saltRounds = 10; // use .env'
/**
 * Write content to file
 * @param content
 * @returns
 */
const create = (content = null) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    if (content == null) {
        throw new Error('Cannot save null values to file');
    }
    const saltRounds = process.env.SALT_ROUNDS;
    if (saltRounds == null || saltRounds === undefined) {
        throw new http_errors_1.InternalServerError();
    }
    const hash = yield bcrypt_1.default.hash(JSON.stringify(content), Number(saltRounds));
    let dbData = yield fetch();
    if (dbData != null && dbData != '') {
        data = JSON.parse(dbData);
    }
    let objectOnFileKeys = Object.keys(data);
    if (objectOnFileKeys.length > 0) {
        objectOnFileKeys.map((key) => __awaiter(void 0, void 0, void 0, function* () {
            let keyExists = yield bcrypt_1.default.compare(JSON.stringify(content), key);
            if (keyExists) {
                delete data[key];
                data[key] = content;
            }
        }));
    }
    else {
        data[hash] = content;
    }
    return yield promises_1.default.writeFile('./db.json', JSON.stringify(data));
});
/**
 * Read content from file
 * @returns
 */
const fetch = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield promises_1.default.readFile('./db.json', { encoding: 'utf8' });
});
/**
 * Get a signle item
 * @param query
 * @returns
 */
const findOneByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let fileData = yield promises_1.default.readFile('./db.json', { encoding: 'utf8' });
    let data = JSON.parse(fileData);
    const result = Object.values(data).filter((dataObject) => {
        if (email == dataObject.email) {
            return dataObject;
        }
    });
    return result[0];
});
exports.default = {
    create,
    fetch,
    findOneByEmail,
};
