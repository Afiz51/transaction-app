import path from 'node:path';
import fs from 'node:fs/promises';

import type { Balances, Transactions } from '../types';

const balancesPath = path.join(__dirname, '../../data/balances.json');
const transactionsPath = path.join(__dirname, '../../data/transactions.json');

export async function readBalancesFile(): Promise<Balances[]> {
  const data = await fs.readFile(balancesPath, 'utf8');
  // console.log(data);
  return JSON.parse(data);
}

export async function readTransactionsFile(): Promise<Transactions[]> {
  const data = await fs.readFile(transactionsPath, 'utf8');
  return JSON.parse(data);
}

export function writeBalancesFile(data: string) {
  fs.writeFile(balancesPath, data);
}

export function writeTransactionsFile(data: string) {
  fs.writeFile(transactionsPath, data);
}
