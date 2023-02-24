import { compare, hash } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import bcriptjs from "bcryptjs";
import { prismaClient } from "../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";

export class UserController {
  async index(req: Request, res: Response) {
    try {
      const user = await prismaClient.user.findMany();

      if (!user) {
        res.status(404).json({ message: "No user found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error INDEXUSERCONTROLLER" });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let userExists = await prismaClient.user.findUnique({ where: { email } });

      if (userExists) {
        return res.status(422).json({ message: "User already Exists" });
      }

      const hash_password = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: { name, email, password: hash_password },
      });

      const isValuePassword = await compare(password, user.password);

      if (!isValuePassword) {
        return res.status(422).json({ message: "Invalid Password" });
      }

      const token = sign({}, authConfig.jwt.secret, {
        subject: user.id_User,
        expiresIn: authConfig.jwt.expiresIn,
      });

      res.status(201).json({ user, token });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error CREATE USERCONTROLLER" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id: id_User } = req.params;
      const user = await prismaClient.user.findUnique({
        where: { id_User },
      });

      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error GETUSERBYID USERCONTROLLER" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prismaClient.user.findUnique({ where: { email } });

      if (!user) {
        res.status(404).json({ message: "User Not Found" });
        return;
      }

      //check if password matches
      if (!(await bcriptjs.compare(password, user.password))) {
        res.status(422).json({ message: "Invalid Password" });
        return;
      }

      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error LOGIN USERCONTROLER" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id: id_User } = req.params;

      const user = await prismaClient.user.delete({ where: { id_User } });

      if (!user) {
        res.status(404).json({ message: "User not Found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error DELETE USER CONTROLER" });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { search, take, skip } = req.query;

      const result = await prismaClient.user.findMany({
        where: {
          name: {
            contains: String(search),
          },
        },
        take: Number(take),
        skip: Number(skip),
      });

      if (!search) {
        res.status(404).json({ message: "Please write something" });
      }

      if (!result) {
        res.status(404).json({ message: "User not found" });
      }

      return res.json(result);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error SERARCH USER CONTROLELR" });
    }
  }
}
