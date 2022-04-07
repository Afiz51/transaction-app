"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = void 0;
const files_1 = require("../models/files");
const uuid_1 = require("uuid");
async function transfer(data) {
    const transferData = {
        reference: uuid_1.v4(),
        amount: +data.amount,
        senderAccount: data.senderAccount,
        recieverAccount: data.recieverAccount,
        transferDescription: data.transferDescription,
        createdAt: new Date().toISOString(),
    };
    const senderId = +data.senderAccount;
    const reciverId = +data.recieverAccount;
    console.log('senderId: ', senderId);
    console.log('reciverId: ', reciverId);
    //get all accounts
    const allAccounts = await files_1.readBalancesFile();
    const allTransactions = await files_1.readTransactionsFile();
    //find the sender and reciver accounts
    const senderIdIndex = allAccounts.findIndex((acc) => acc.accountNumber === senderId);
    const reciverIdIndex = allAccounts.findIndex((acc) => acc.accountNumber === reciverId);
    if (senderIdIndex === -1) {
        return { message: 'Sender account not found' };
    }
    if (reciverIdIndex === -1) {
        return { message: 'Reciver account not found' };
    }
    //get the sender and reciver  account details
    const senderAccount = allAccounts[senderIdIndex];
    const reciverAccount = allAccounts[reciverIdIndex];
    if (senderAccount.balance < data.amount) {
        return { message: 'Insuficient funds' };
    }
    senderAccount.balance = senderAccount.balance - data.amount;
    reciverAccount.balance = reciverAccount.balance + data.amount;
    //update the amounts
    allAccounts[senderIdIndex] = senderAccount;
    allAccounts[reciverIdIndex] = reciverAccount;
    //update transactions table
    allTransactions.push(transferData);
    await files_1.writeBalancesFile(JSON.stringify(allAccounts));
    await files_1.writeTransactionsFile(JSON.stringify(allTransactions));
    // console.log(transferData);
    return transferData;
}
exports.transfer = transfer;
//# sourceMappingURL=transactionController.js.map