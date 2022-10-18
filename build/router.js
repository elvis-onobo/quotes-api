"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const QuotesController_1 = __importDefault(require("./controllers/QuotesController"));
// middleware
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const router = express_1.default.Router();
exports.default = router;
router.post('/auth/signup', AuthController_1.default.signup);
router.post('/auth/login', AuthController_1.default.login);
router.get('/quotes/fetch', authMiddleware_1.default, QuotesController_1.default.quotes);
