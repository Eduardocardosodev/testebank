import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class TransactionController {
  async deposit(req: Request, res: Response) {
    try {
      const { value, email } = req.body;
      const { id } = req.params;

      const user = await prismaClient.user.findUnique({ where: { email } });

      const deposit = await prismaClient.transaction.create({
        data: {
          value,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
