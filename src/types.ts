export interface Balances {
  accountNumber: number;
  balance?: number;
  createdAt: string;
}

export interface Transactions {
  reference: string;
  senderAccount: string;
  amount: number;
  recieverAccount: string;
  transferDescription?: string;
  createdAt: string;
}
