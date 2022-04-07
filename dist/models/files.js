"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTransactionsFile = exports.writeBalancesFile = exports.readTransactionsFile = exports.readBalancesFile = void 0;
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = __importDefault(require("node:fs/promises"));
const balancesPath = node_path_1.default.join(__dirname, '../../data/balances.json');
const transactionsPath = node_path_1.default.join(__dirname, '../../data/transactions.json');
async function readBalancesFile() {
    const data = await promises_1.default.readFile(balancesPath, 'utf8');
    // console.log(data);
    return JSON.parse(data);
}
exports.readBalancesFile = readBalancesFile;
async function readTransactionsFile() {
    const data = await promises_1.default.readFile(transactionsPath, 'utf8');
    return JSON.parse(data);
}
exports.readTransactionsFile = readTransactionsFile;
function writeBalancesFile(data) {
    promises_1.default.writeFile(balancesPath, data);
}
exports.writeBalancesFile = writeBalancesFile;
function writeTransactionsFile(data) {
    promises_1.default.writeFile(transactionsPath, data);
}
exports.writeTransactionsFile = writeTransactionsFile;
//# sourceMappingURL=files.js.map