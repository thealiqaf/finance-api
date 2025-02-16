"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const TransactionRoutes_1 = __importDefault(require("./routes/TransactionRoutes"));
const db_1 = __importDefault(require("./config/db"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use('/api/users', UserRoutes_1.default);
app.use('/api', TransactionRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API is running');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
