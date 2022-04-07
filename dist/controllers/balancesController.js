"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = exports.readAllAccounts = void 0;
const files_1 = require("../models/files");
function readAllAccounts() {
    return files_1.readBalancesFile();
}
exports.readAllAccounts = readAllAccounts;
async function createAccount(data) {
    const newAccount = {
        balance: +data.balance,
        accountNumber: generateAccountNumber(),
        createdAt: new Date().toISOString(),
    };
    const accounts = await readAllAccounts();
    accounts.push(newAccount);
    await files_1.writeBalancesFile(JSON.stringify(accounts));
    return newAccount;
}
exports.createAccount = createAccount;
function generateAccountNumber() {
    return Math.floor(10000000000 + Math.random() * 99999999999);
}
//# sourceMappingURL=balancesController.js.map