import express from 'express';
import z from 'zod';
import { transfer } from '../controllers/transactionController';

const router = express.Router();

router.post('/', async (req, res) => {
  const transactionSchema = z.object({
    amount: z.number(),
    senderAccount: z.number().gte(10000000000).lte(99999999999),
    recieverAccount: z.number().gte(10000000000).lte(99999999999),
    transferDescription: z.string(),
  });

  try {
    const data = req.body;
    const validData = transactionSchema.parse(data);
    const transferObj = await transfer(validData);
    res.send(transferObj);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res
        .status(400)
        .send({ message: 'Please make sure your inputs are right' });
      return;
    }
  }
});

export default router;
