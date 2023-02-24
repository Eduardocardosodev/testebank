import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class AccountController {
  async create(
    req: Request,
    res: Response,
    from: string,
    to: string,
    amount: number
  ) {
    try {
      const { id: userId } = req.params;

      const accountExists = await prismaClient;

      await prismaClient.$transaction(async (tx) => {
        const sender = await tx.account.update({
          data: {
            balance: {
              decrement: amount,
            },
          },
          where: {
            email: from,
          },
        });

        if (sender.balance < 0) {
          throw new Error(`${from} doesn't have enough to send ${amount}`);
        }

        const recipient = await tx.account.update({
          data: {
            balance: {
              increment: amount,
            },
          },
          where: {
            email: to,
          },
        });

        return recipient;
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
