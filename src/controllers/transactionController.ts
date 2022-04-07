import {
  readBalancesFile,
  readTransactionsFile,
  writeBalancesFile,
  writeTransactionsFile,
} from '../models/files';
import { v4 as uuidv4 } from 'uuid';

export async function transfer(data: Record<string, any>) {
  const transferData = {
    reference: uuidv4(),
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
  const allAccounts = await readBalancesFile();
  const allTransactions = await readTransactionsFile();

  //find the sender and reciver accounts
  const senderIdIndex = allAccounts.findIndex(
    (acc) => acc.accountNumber === senderId,
  );
  const reciverIdIndex = allAccounts.findIndex(
    (acc) => acc.accountNumber === reciverId,
  );

  if (senderIdIndex === -1) {
    return { message: 'Sender account not found' };
  }

  if (reciverIdIndex === -1) {
    return { message: 'Reciver account not found' };
  }

  //get the sender and reciver  account details
  const senderAccount = allAccounts[senderIdIndex];
  const reciverAccount = allAccounts[reciverIdIndex];

  if ((senderAccount.balance as number) < data.amount) {
    return { message: 'Insuficient funds' };
  }
  senderAccount.balance = (senderAccount.balance as number) - data.amount;
  reciverAccount.balance = (reciverAccount.balance as number) + data.amount;

  //update the amounts
  allAccounts[senderIdIndex] = senderAccount;
  allAccounts[reciverIdIndex] = reciverAccount;

  //update transactions table
  allTransactions.push(transferData);

  await writeBalancesFile(JSON.stringify(allAccounts));
  await writeTransactionsFile(JSON.stringify(allTransactions));
  // console.log(transferData);
  return transferData;
}
