import express from 'express';
import z from 'zod';
import {
  createAccount,
  readAllAccounts,
} from '../controllers/balancesController';
const router = express.Router();

//get all balances/accounts
router.get('/', async (req, res) => {
  const data = await readAllAccounts();
  res.send({ data: data });
});

//get a particlar balance
router.get('/balance/:account_no', async (req, res) => {
  const account_no = Number(req.params.account_no);
  const accountNoToString = account_no.toString();
  if (accountNoToString.length !== 11) {
    res.send({ message: 'Invalid account number' });
    return;
  }

  const mySchema = z.number().gte(10000000000).lte(99999999999);

  const validAccount_no = mySchema.parse(account_no);
  const accounts = await readAllAccounts();

  const account = accounts.find((acc) => acc.accountNumber === validAccount_no);
  if (!account) {
    return { message: 'Account not found' };
  }
  res.send(account);
});

//create an account
router.post('/create-account', async (req, res) => {
  try {
    const User = z.object({
      balance: z.number(),
    });
    const data = req.body;
    const validData = User.parse(data);
    const account = await createAccount(validData);
    res.status(201).send({ data: account });
    console.log(validData);
  } catch (error) {
    if (error instanceof Error) {
      //error.issues[0].message
      res.send({ message: 'Please enter a valid amount' });
      return;
    }
  }
});

export default router;
