import { readBalancesFile, writeBalancesFile } from '../models/files';

export function readAllAccounts() {
  return readBalancesFile();
}

export async function createAccount(data: Record<string, any>) {
  const newAccount = {
    balance: +data.balance,
    accountNumber: generateAccountNumber(),
    createdAt: new Date().toISOString(),
  };

  const accounts = await readAllAccounts();

  accounts.push(newAccount);

  await writeBalancesFile(JSON.stringify(accounts));

  return newAccount;
}

function generateAccountNumber() {
  return Math.floor(10000000000 + Math.random() * 99999999999);
}
