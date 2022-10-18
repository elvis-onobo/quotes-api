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
const axios_1 = __importDefault(require("axios"));
const redis_1 = __importDefault(require("../config/redis"));
const http_errors_1 = require("http-errors");
class QuotesService {
    /**
     * Fetch quotes and randomly return one quote
     * @returns
     */
    static quotes() {
        return __awaiter(this, void 0, void 0, function* () {
            let quotes;
            quotes = (yield redis_1.default.get('quotes'));
            quotes = JSON.parse(quotes);
            if (quotes == null) {
                const result = yield axios_1.default.get('https://type.fit/api/quotes');
                quotes = result.data;
                yield redis_1.default.set('quotes', JSON.stringify(quotes));
            }
            if (quotes == null) {
                throw new http_errors_1.NotFound('No quote found');
            }
            const quote = quotes[Math.floor(Math.random() * quotes.length)];
            return quote;
        });
    }
}
exports.default = QuotesService;
