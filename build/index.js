"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const app_1 = __importDefault(require("./app"));
const PORT = 4000;
// connect to database
app_1.default.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
