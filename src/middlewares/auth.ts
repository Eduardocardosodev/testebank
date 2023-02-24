import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../config/auth";
import { prismaClient } from "../database/prismaClient";

export const AuthMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = verify(token, auth.jwt.secret);
    const { email } = req.body;

    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not authorized" });
    }

    console.log(decoded);

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token not provided" });
  }
};
