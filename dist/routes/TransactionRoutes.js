"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Transaction_1 = require("../controllers/Transaction");
const router = express_1.default.Router();
router.post('/transactions', Transaction_1.addTransaction);
router.get('/transactions/:userId', Transaction_1.getTransaction);
exports.default = router;
