import { NextFunction, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { prismaClient } from '../database/prismaClient';

export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transport = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_GOOGLE,
      pass: process.env.PASS_GOOGLE,
    },
  });
  const { email, name } = req.body;

  const user = prismaClient.user.findFirst({ where: { name } });

  if (!user) {
    return;
  }

  transport
    .sendMail({
      from: 'Teste',
      to: email,
      subject: 'Seja, Bem-vindo !!!',
      html: `<div style="background:grey;height:320px;width:100%;"><h1 style="text-align: center;">Obrigado por criar uma conta em nosso site, ${name}</h1> <p style="font-size: 1.3rem;color:white;text-align:center">Confirme sua conta</p> <div style="margin: 0 auto;text-align:center;"><button style="background: green;padding: 15px 25px;border:none;border-radius: 10px;"><a style="text-decoration:none;color:white;font-weight:bold;" href="https://google.com">CONFIRMACAO</a></button></div><img style="height:80px;width:80px;margin-left: 47%;margin-top:20px" src=""></img></div>`,
    })
    .then(() => console.log('Email enviado com sucesso'))
    .catch((err) => console.log(err));

  next();
};
