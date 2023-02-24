import { body } from "express-validator";

export const userFormValidator = [
  body("name").isString().isLength({ min: 3 }).withMessage("Min 3 caracteres"),
  body("password")
    .isLength({ min: 7 })
    .withMessage("Min 8 characteres")
    .matches(/^(.*[A-Z].*)$/)
    .withMessage(
      "Password must contain at least one uppercase lettereeedaddddadadadddddddddddddddda"
    ),
  body("password")
    .matches(/(?=.*\d)/)
    .withMessage("Password must contain ate least one number"),
];
